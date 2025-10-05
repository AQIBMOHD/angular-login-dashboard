import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../services/employee.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AuthService, User } from '../auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BaseChartDirective,
    RouterModule
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  currentUser: User | null = null;
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalEmployees = 0;
  totalDepartments = 0;
  avgSalary = 0;
  maxSalary = 0;

  // Line Chart
  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  // Pie Chart
  public pieChartData: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'right' } }
  };

  constructor(private empService: EmployeeService,
  private authService: AuthService
  ) {}


  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();

    this.empService.getAll().subscribe((employees: Employee[]) => {
      this.dataSource.data = employees;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.totalEmployees = employees.length;
      this.totalDepartments = new Set(employees.map(e => e.department)).size;
      this.avgSalary = Math.round(employees.reduce((a, b) => a + b.salary, 0) / employees.length);
      this.maxSalary = Math.max(...employees.map(e => e.salary));


      //  Line Chart (salary trend by employee)
      this.lineChartData = {
        labels: employees.map(e => e.name),
        datasets: [
          {
            data: employees.map(e => e.salary),
            label: 'Salaries (₹)',
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63,81,181,0.3)',
            fill: true,
            tension: 0.3
          }
        ]
      };

      //  Pie Chart (department distribution)
      const deptMap = new Map<string, number>();
      employees.forEach(e => deptMap.set(e.department, (deptMap.get(e.department) || 0) + 1));
      this.pieChartData = {
        labels: Array.from(deptMap.keys()),
        datasets: [{ data: Array.from(deptMap.values()), backgroundColor: ['#3f51b5','#e91e63','#ff9800','#4caf50','#9c27b0'] }]
      };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  logout(): void {
  this.authService.logout();   // Ab ye login page pe redirect karega
}


  editEmployee(emp: Employee) {
    console.log("Edit employee:", emp);
  }

  deleteEmployee(emp: Employee) {
    console.log("Delete employee:", emp);
  }
}
