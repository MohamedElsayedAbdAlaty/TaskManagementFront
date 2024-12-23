import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskSearchDto } from './Models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl="https://localhost:7195/api/TaskDtos"
  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  get(id: any): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl, data,{headers});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
  searh(data: TaskSearchDto ):Observable<Task[]>
  {
    const filteredData = { ...data };
    /*Object.keys(filteredData).forEach(key => {
      if (filteredData[key] === null || filteredData[key] === undefined || filteredData[key] === '') {
        delete filteredData[key];
      }
    });*/
  
    // Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    // Debugging: Log the payload
    console.log('Payload:', filteredData);
  
  // Remove empty or null values
    console.log(data)

    const searchRequest: TaskSearchDto = {
      name: data.name || null, // Convert empty string to null
      status: data.status ? Number(data.status) : null, // Convert 'status' to a number, if valid
      priority: data.priority || null // Convert empty string to null
    };
    return this.http.post<Task[]>(this.baseUrl+"/search",searchRequest,{headers});

  }
 sanitizeFilters(filters: TaskSearchDto): any {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );
  }
}
