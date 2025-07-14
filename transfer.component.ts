
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  standalone:true,
  imports:[CommonModule,FormsModule],
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

  onSubmit() {
    if (this.transferData.accountNumber !== this.transferData.confirmAccountNumber) {
      alert('Account numbers do not match!');
      return;
    }
    console.log('Transfer initiated:', this.transferData);
    alert('Transfer request submitted successfully!');
  }
}
