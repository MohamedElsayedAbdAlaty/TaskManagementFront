import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodoItemFormComponent } from './todo-items/todo-item-form/todo-item-form.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  { path: '', component: TodoItemsComponent },
  { path: 'add', component: TodoItemFormComponent },
  { path: 'edit/:id', component: TodoItemFormComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
