import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {
  task?: Task;
  form?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const taskId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
      this.form = new FormGroup({
        id: new FormControl(this.task.id),
        title: new FormControl(this.task.title),
        description: new FormControl(this.task.description),
        dueDate: new FormControl(this.task.dueDate),
        priority: new FormControl(`${this.task.priority}`),
        ...(this.task.resolvedAt && {resolvedAt: new FormControl(this.task.resolvedAt)}),
      });
    });
  }

  updateTask(): void {
    if (this.form) {
      this.taskService.updateTask(this.form.value).subscribe(() => {
        this._snackBar.open(`Updated task: ${this.form?.value.title}`, 'Close', { horizontalPosition: 'end', verticalPosition: 'bottom', duration: 4000 });
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
