import { publishFacade } from "@angular/compiler";

export class Task
{
     id:number =0;
     name:string | undefined ;
      description:string | undefined 
      assignee :string | undefined;
      status?:TaskStatus | undefined;   

      dueDate?:Date | undefined; 
      priority? :PriorityLevel | undefined;
}
export enum TaskStatus
{
    ToDo,
    InProgress,
    Completed
   
}
export class TaskSearchDto
{
  name?:string|null;
  status?:number|null;
  priority?:number|null;
}

export enum PriorityLevel
{
    High,
    Medium,
    Low
}