import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankingserviceService } from '../bankingservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../bankingservice.service';

@Component({
  selector: 'app-credit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [BankingserviceService],
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent {
  creditData = {
    accountNumber: '',
    accountHolderName: '',
    amount: null
  };
successMessage: string | null = null;
errorMessage: string | null = null;

  constructor(
    private bankingserviceService: BankingserviceService,
    private router: Router 
  ) {}

  onSubmit(): void {
  const accno = Number(this.creditData.accountNumber);
  const amount = Number(this.creditData.amount);

  this.bankingserviceService.creditAmount(accno, amount).subscribe({
  next: () => {
    this.bankingserviceService.getUserByAccNo(accno).subscribe(users => {
      if (users.length > 0) {
        const updatedUser = users[0];
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        
        const txn:Transaction = {
          accno: accno,
          type: 'credit',
          amount: amount,
          date: new Date().toISOString()
        };
        this.bankingserviceService.recordTransaction(txn).subscribe();

        this.successMessage = `₹${amount} credited to account ${accno}. New Balance: ₹${updatedUser.balance}`;
        this.errorMessage = null;

        setTimeout(() => this.router.navigate(['/dashboard/home']), 3000);
      }
    });
  },
  error: err => {
    this.errorMessage = 'Error: ' + err.message;
    this.successMessage = null;
  }
});

}

}
