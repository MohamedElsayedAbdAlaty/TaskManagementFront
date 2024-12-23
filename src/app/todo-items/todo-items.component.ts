import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { PriorityLevel, Task, TaskSearchDto, TaskStatus } from '../Models/todo.model';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo-items',
  standalone: true,
  templateUrl: './todo-items.component.html',
  styles: [
  ],
  imports:[NgFor,RouterModule,FormsModule,ReactiveFormsModule ]
})
export class TodoItemsComponent implements OnInit {

  items: Task[] = [];
  tasks: any[] = [];
   searchForm: FormGroup;
   TaskStatus = TaskStatus; // Expose TaskStatus enum to the template
   PriorityLevel = PriorityLevel; // Expose PriorityLevel enum to the template
 
  statuses = Object.entries(TaskStatus)
  .filter(([key, value]) => isNaN(Number(key))) // Filter out numeric keys
  .map(([key, value]) => ({ key, value })); 
  priorities = Object.entries(PriorityLevel)
  .filter(([key, value]) => isNaN(Number(key))) // Filter out numeric keys
  .map(([key, value]) => ({ key, value })); 
  constructor(private todoService: HttpService,  private fb: FormBuilder,) {
     this.searchForm = this.fb.group({
        
          name: [''],
         
         status:[''],
       
          priority :[''],
        });
  }

  ngOnInit(): void {
    this.loadItems();
  }
  
  search(): void {
    const taskSearchDto:TaskSearchDto=this.searchForm.value;
    this.todoService.searh((taskSearchDto)).subscribe((data) => {
      this.tasks = data;
      this.items=this.tasks;
    });
  }
  sanitizeFilters(filters: TaskSearchDto): any {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );
  }
  loadItems(): void {
    this.todoService.getAll().subscribe(data => {
      this.items = data;
    });
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoService.delete(id).subscribe(() => {
        this.loadItems();
      });
    }
  }
  Clear()
  {
    this.searchForm.reset();
  }
}
