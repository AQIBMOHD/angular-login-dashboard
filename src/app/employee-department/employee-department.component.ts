import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { DepartmentFormComponent } from '../department-form/department-form.component';

@Component({
  selector: 'app-employee-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmployeeFormComponent, DepartmentFormComponent],
  templateUrl: './employee-department.component.html',
  styleUrl: './employee-department.component.css'
})
export class EmployeeDepartmentComponent implements OnInit {
  parentForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      employee: this.fb.group({}), // yaha p maine child compo attach kiya hai
      department: this.fb.group({})
    });
  }

  onSubmit() {
    if (this.parentForm.valid) {
      console.log("Final Form Data:", this.parentForm.value);
    }
  }
}


