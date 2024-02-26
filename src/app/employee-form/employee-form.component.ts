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
  showRemainingFields: boolean = false;
  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formData = this.fb.group({
      employee_name: ['', [Validators.required, Validators.maxLength(30)]],
      employee_id: ['', Validators.required],
      department: ['', Validators.required],
      dob: ['', [Validators.required, this.dateOfBirthValidator]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.maxLength(8)]]
    });
  }

  dateOfBirthValidator(control: any) {
    const dob = new Date(control.value);
    const currentDate = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);

    if (dob > currentDate) {
      return { 'futureDate': true };
    }
    if (dob > minAgeDate) {
      return { 'minAge': true };
    }
    return null;
  }

  toggleVisibility() {
    this.showRemainingFields = !this.showRemainingFields;
  }

  submitForm() {
    if (this.formData.valid) {
      this.formSubmitted = true;

      
      

      const formDataToSend = {
        employee_name: this.formData.value.employee_name,
        employee_id: this.formData.value.employee_id,
        department: this.formData.value.department,
        dob: this.formData.value.dob,
        gender: this.formData.value.gender,
        designation: this.formData.value.designation,
        salary: this.formData.value.salary
      };

      this.http.post('http://localhost:5000/submitForm', formDataToSend)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.error(error);
          }
        );

      this.formData.reset();
      this.showRemainingFields = false;
    }
  }
}
