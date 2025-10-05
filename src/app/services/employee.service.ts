import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

interface EmployeeDb {
  employees: Employee[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'assets/employee.json';

  constructor(private http: HttpClient) {}


  getAll(): Observable<Employee[]> {
    return this.http.get<EmployeeDb>(this.url).pipe(
      map(db => db.employees),
      catchError(err => {
        console.error('Error reading employee.json', err);
        return of([]);
      })
    );
  }
}
