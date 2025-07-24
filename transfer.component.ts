import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankingserviceService } from '../bankingservice.service';
import { Router } from '@angular/router';
import { Transaction } from '../bankingservice.service';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';
 
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
  constructor(private bankingService: BankingserviceService, private router: Router, private toaster: ToastrService) {}
 
  onSubmit(): void {
    const fromAcc = Number(this.transferData.accountNumber);
    const toAcc = Number(this.transferData.confirmAccountNumber);
    const amount = Number(this.transferData.amount);
 
    if (fromAcc !== toAcc) {
      this.bankingService.transferAmount(fromAcc, toAcc, amount).subscribe({
  next: () => {
    this.bankingService.getUserByAccNo(fromAcc).subscribe(users => {
      if (users.length > 0) {
        const updatedSender = users[0];
        localStorage.setItem('loggedInUser', JSON.stringify(updatedSender));
        //this.toaster.success("Success");
       
        const debitTxn:Transaction = {
          accno: fromAcc,
          type: 'transfer',
          amount: amount,
          date: new Date().toISOString()
        };
        const creditTxn:Transaction = {
          accno: toAcc,
          type: 'transfer',
          amount: amount,
          date: new Date().toISOString()
        };

        this.bankingService.recordTransaction(debitTxn).subscribe();
        this.bankingService.recordTransaction(creditTxn).subscribe();

        this.successMessage = `SmartBank says: ₹${amount} transferred from ${fromAcc} to ${toAcc}.`;
        this.errorMessage = null;
        
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/dashboard/home']);
        }, 2000);
      }
    });
    
  },
  error: err => {
    this.errorMessage = 'SmartBank says: ' + err.message;
    this.successMessage = null;
  }
});

    }
    
    else {
      alert('Account numbers must be different for transfer');
    }

  }
 
}
 
  