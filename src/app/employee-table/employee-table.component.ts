import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.http.get('http://localhost:5000/getEmployees')
      .subscribe((response: any) => {
        this.employees = response;
      }, (error) => {
        console.error(error);
      });
  }
  deleteEmployee(employeeId: number) {

    this.http.delete(`http://localhost:5000/deleteEmployee/${employeeId}`).subscribe(() => {
   
      this.fetchEmployees();
    });
  }
}
