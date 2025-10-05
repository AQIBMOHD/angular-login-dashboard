import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone:true,
  imports:[CommonModule ,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls:['./employee-form.component.css']

})
export class EmployeeFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;  //Parent form reference
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, Validators.min(3000)]],

    });

    
    this.parentForm.setControl('employee', this.employeeForm);






  }
}
