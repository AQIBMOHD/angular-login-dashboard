import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']

})
export class DepartmentFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  departmentForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      deptName: ['', Validators.required],
      location: ['', Validators.required]
    });

    //  Attach child form to parent
    this.parentForm.setControl('department', this.departmentForm);
  }
}
