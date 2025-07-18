import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BankingserviceService } from '../bankingservice.service';


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
  
  constructor(private router: Router, private http: HttpClient, private authservice: BankingserviceService) {}

  
validate(nf: any) {
  if (nf.valid) {
    this.http.get<any[]>(`http://localhost:3000/users?accno=${this.username}&password=${this.pwd}`).subscribe(users => {
      if (users.length > 0) {
        
        
        const user = users[0];
        localStorage.setItem('loggedInUser', JSON.stringify(user)); 
        this.msg = 'SUCCESSFULLY LOGIN';
        this.error1 = 'green';
        this.loading = true;
        localStorage.setItem('username',this.username);

        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['dashboard/home']);
        }, 1000);
      } else {
        this.msg = 'INVALID USERNAME AND PASSWORD';
        this.error1 = 'red';
      }
    });
  }
}
}
