import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BankingserviceService } from '../bankingservice.service';

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
  generateAccNo(): number {
  return Math.floor(1000000 + Math.random() * 9000000);
}
constructor(private bankingService: BankingserviceService){}
  register(form: NgForm) {
  if (form.valid) {
    if (this.password === this.confirmPassword) {
      const accno = this.generateAccNo();
      
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        accno: accno,
        balance: 0
      };

      this.bankingService.registerUser(newUser).subscribe({
        next: () => {
          this.msg = 'Registration Successful!';
          this.msgColor = 'green';
          this.generatedAccNo = accno;
        },
        error: () => {
          this.msg = 'Registration Failed!';
          this.msgColor = 'red';
        }
      });
    } else {
      this.msg = 'Passwords do not match.';
      this.msgColor = 'red';
    }
  }
}

generatedAccNo: number = 0;

}
