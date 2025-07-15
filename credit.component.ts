import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankingserviceService } from '../bankingservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private bankingserviceService: BankingserviceService,
    private router: Router // ✅ Inject Router
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

            alert(`₹${amount} credited to account ${accno}. New Balance: ₹${updatedUser.balance}`);
            this.router.navigate(['/dashboard/home']);
          }
        });
      },
      error: err => {
        alert('Error: ' + err.message);
      }
    });
  }
}
