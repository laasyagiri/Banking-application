import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BankingserviceService } from '../bankingservice.service';
import { Transaction } from '../bankingservice.service';

@Component({
  selector: 'app-debit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [BankingserviceService],
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent {
  debitModel = {
    accountNumber: '',
    name: '',
    password: '',
    amount: null
  };

  transactions: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private bankingService: BankingserviceService, private router: Router) {}

  onSubmit(form: any): void {
    if (form.valid) {
      const accno = Number(this.debitModel.accountNumber);
      const amount = Number(this.debitModel.amount);

      this.bankingService.debitAmount(accno, amount).subscribe({
        next: () => {
          this.bankingService.getUserByAccNo(accno).subscribe(users => {
            if (users.length > 0) {
              const updatedUser = users[0];
              localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
              const txn:Transaction = {
  accno: accno,
  type: 'debit',
  amount: amount,
  date: new Date().toISOString()
};
this.bankingService.recordTransaction(txn).subscribe();

              this.transactions.push({ ...this.debitModel });
              this.successMessage = `SmartBank says: ₹${amount} withdrawn. New Balance: ₹${updatedUser.balance}`;
              this.errorMessage = null;

              setTimeout(() => {
                this.successMessage = null;
                this.router.navigate(['/dashboard/home']);
              }, 3000);

              form.resetForm();
            }
          });
        },
        error: err => {
          this.errorMessage = 'SmartBank says: ' + err.message;
          this.successMessage = null;
        }
      });
    }
  }
}
