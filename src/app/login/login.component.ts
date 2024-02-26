import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    this.http.post<any>('http://localhost:5000/login', { username: this.username, password: this.password })
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/show']);
        },
        error => {
          console.error('Login error', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
  }
  
}
