import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankingserviceService } from '../bankingservice.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-transfer',
  standalone:true,
  providers:[BankingserviceService],
  imports:[CommonModule,FormsModule,HttpClientModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  transferData = {
    accountNumber: '',
    confirmAccountNumber: '',
    accountHolderName: '',
    amount: null
  };
 successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private bankingService: BankingserviceService, private router: Router) {}
 
  onSubmit(): void {
    const fromAcc = Number(this.transferData.accountNumber);
    const toAcc = Number(this.transferData.confirmAccountNumber);
    const amount = Number(this.transferData.amount);
 
    if (fromAcc !== toAcc) {
      this.bankingService.transferAmount(fromAcc, toAcc, amount).subscribe({
        next: () => {
          // Update sender info for HomeComponent
          this.bankingService.getUserByAccNo(fromAcc).subscribe(users => {
            if (users.length > 0) {
              const updatedSender = users[0];
              localStorage.setItem('loggedInUser', JSON.stringify(updatedSender));
              this.successMessage=(`SmartBank says: ₹${amount} transferred from ${fromAcc} to ${toAcc}.`);
              this.errorMessage=null;
setTimeout(() => {
                this.successMessage = null;
                this.router.navigate(['/dashboard/home']);
              }, 200);            }
          });
        },
        error: err => {
          this.errorMessage=('SmartBank says: ' + err.message);
                  this.successMessage = null;

        }
      });
    }
    
    else {
      alert('Account numbers must be different for transfer');
    }

  }
 
}
 
  