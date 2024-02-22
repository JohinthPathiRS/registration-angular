import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  formData: FormGroup;

 
  departments: string[] = ['IT', 'Finance', 'Marketing'];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.formData = this.fb.group({
      employee_name: ['', [Validators.required, Validators.maxLength(30)]],
      employee_id: ['', Validators.required],
      department: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.maxLength(8)]]
    });
  }

  submitForm() {
    console.log(this.formData.value);
    if (this.formData.valid) {
      const formDataWithFormattedDate = { ...this.formData.value };

      this.http.post('http://localhost:3000/submitForm', formDataWithFormattedDate)
        .subscribe((response: any) => {
          alert(response.message);
          this.formData.reset();
        }, (error) => {
          console.log(error);
          alert('Error submitting form');
        });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
