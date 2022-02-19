import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FUTURE_TASKS } from '../mock-tasks';
import { Task } from '../task';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.startTaskLoop();
    });
  }

  startTaskLoop(): void {
    const loop = () => {
      setTimeout(() => {
        const nextTask = FUTURE_TASKS.shift() as Task;
        if (nextTask) {
          this.addTask(nextTask);
          loop();
        }
      }, (Math.random() * (7 - 5) + 5) * 1000);
    };

    loop();
  }

  addTask(newTask: Task): void {
    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this._snackBar.open(`Added task: ${task.title}`, 'Close', { horizontalPosition: 'end', verticalPosition: 'bottom', duration: 4000 });
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this._snackBar.open(`Deleted task: ${task.title}`, 'Close', { horizontalPosition: 'end', verticalPosition: 'bottom', duration: 4000 });
    });
  }

  resolveTask(task: Task): void {
    const date = new Date();
    const resolvedTask: Task = {
      ...task,
      resolvedAt: date,
    };

    this.taskService.resolveTask(resolvedTask).subscribe(() => {
      this.tasks = this.tasks.map(t => {
        if (t.id === task.id) {
          return resolvedTask;
        }

        return t;
      });
      this._snackBar.open(`Task resolved: ${task.title}`, 'Close', { horizontalPosition: 'end', verticalPosition: 'bottom', duration: 4000 });
    });
  }
}
