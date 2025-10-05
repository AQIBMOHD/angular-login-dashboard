import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';

// User interface
export interface User {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
  name: string;
}

//  Database structure
interface Database {
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private readonly dbUrl = 'assets/db.json';   //  src/assets/db.json

  constructor(private router: Router, private http: HttpClient) {
    // Restore user from localStorage on refresh / app load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);// restore session
    }
  }

  /**  Load users directly from db.json */
  private loadUsers(): Observable<User[]> {
    return this.http.get<Database>(this.dbUrl).pipe(
      map((database: Database) => database.users),
      catchError(err => {
        console.error('Error reading db.json:', err);
        return of([] as User[]); // return empty array if error
      })
    );
  }

  /**  Login check against db.json */
  login(email: string, password: string): Observable<boolean> {
    return this.loadUsers().pipe(
      map((users: User[]) => {
        const user = users.find(
          (u: User) => u.email === email && u.password === password
        );

        if (user) {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user)); // Save to storage

          // Navigate according to role
          if (user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
          return true;
        }
        return false;
      }),
      catchError(err => {
        console.error('Login error:', err);
        return of(false);
      })
    );
  }

  /**  Logout */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser'); //  Clear storage
    this.router.navigate(['/login']);
  }

  /**  Getters */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isUser(): boolean {
    return this.currentUser?.role === 'user';
  }
}


