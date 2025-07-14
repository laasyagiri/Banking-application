import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  pwd: string = '';
  msg: string = '';
  error1: string = '';
  loading: boolean = false;

  constructor(private router: Router) {}

  validate(nf: any) {
    if (nf.valid) {
      if (this.username === 'admin77' && this.pwd === 'admin123') {
        this.msg = 'SUCCESSFULLY LOGIN';
        this.error1 = 'green';
        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['dashboard']);
        }, 2000);
      } else {
        this.msg = 'INVALID USERNAME AND PASSWORD';
        this.error1 = 'red';
      }
    }
  }
}
