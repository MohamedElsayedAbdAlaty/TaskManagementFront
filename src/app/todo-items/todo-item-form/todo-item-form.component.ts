import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { Task } from '../../Models/todo.model';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-todo-item-form',
  standalone: true,
  templateUrl: './todo-item-form.component.html',
  styles: [
  ],
imports:[ReactiveFormsModule]
})
export class TodoItemFormComponent implements OnInit {
  todoForm: FormGroup;
  
  taskId: number | null = null;

  taskForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private todoService: HttpService,
    private router: Router,private route: ActivatedRoute,
  ) {
    this.todoForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
     
     assignee :[''],
     status:[''],
     dueDate :[''],
      priority :[''],
    });

    this.taskForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
     
     assignee :[''],
     status:[''],
     dueDate :[''],
      priority :[''],
    });
  }

  ngOnInit(): void {// this.taskId =parseInt( this.route.snapshot.paramMap.get('id').toString()); // Get ID from route
    const taskId = this.route.snapshot.params['id']; // Get ID from route parameter

    console.log('Editing task with ID:', this.taskId);
   this.loadTask(parseInt( taskId))
}
loadTask(id: number): void {
  this.todoService.get(id).subscribe(
    (task) => {
      console.log(task)
     
     
      this.todoForm.patchValue(task); // Populate form with API data
      if (task.dueDate) {
        const date = new Date(task.dueDate); // Convert to Date object
        const formattedDate = this.formatToDateInput(date); // Format for date input
        this.todoForm.controls['dueDate'].setValue(formattedDate); // Set formatted date in form
      }
    },
    (error) => {
      console.error('Error loading task:', error);
    }
  );
}
/*
setDueDate(dateString: string): void {
  // Convert ISO string to a format suitable for <input type="date">
  const formattedDate = this.formatToDateInput(dateString);
  this.taskForm.patchValue({ dueDate: formattedDate });
}*/
/*
formatToDateInput(dateString: string): any {
  // Ensure the date is in YYYY-MM-DD format
  return formatDate(dateString, 'yyyy-MM-dd', 'en');
}*/
  // Helper to format a Date to 'YYYY-MM-DD'
  private formatToDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  saveItem(): void {
    //if (this.todoForm.valid) {
      const todo: Task = this.todoForm.value;
    
    
      if (todo.dueDate) {
        const date = new Date(todo.dueDate); // Convert only if defined
        todo.dueDate = date;// this.formatToDateInput(date); // Format for date input
      }
      console.log(todo)
      if (todo.id === 0) {
        this.todoService.create(todo).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.todoService.update(todo.id, todo).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
   // }
  }
  onSubmit()
  {
    const todo: Task = this.taskForm.value;
    todo.assignee='';
    //todo.dueDate=new Date();
    console.log(todo)
    if (todo.id === 0) {
      debugger;
      this.todoService.create(todo).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.todoService.update(todo.id, todo).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
  onCancel()
  {
    this.router.navigate(['/']);
  }
}
