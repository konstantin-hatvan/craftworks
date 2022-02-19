import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.scss']
})
export class TaskNewComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl(''),
    priority: new FormControl('0'),
  });

  constructor(
    private taskService: TaskService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void { }

  addTask(): void {
    this.taskService.addTask(this.form.value).subscribe(() => this.router.navigate(['tasks']));
  }

  goBack(): void {
    this.location.back();
  }
}
