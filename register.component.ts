import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  msg: string = '';
  msgColor: string = '';

  register(form: any) {
    if (form.valid) {
      if (this.password === this.confirmPassword) {
        this.msg = 'Registration Successful!';
        this.msgColor = 'green';
      } else {
        this.msg = 'Passwords do not match.';
        this.msgColor = 'red';
      }
    }
  }
}
