import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7195/api/auth/login'; // Adjust to your backend URL
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,private router:Router) {}

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl, { username, password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.token);
        
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
