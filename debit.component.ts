import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-debit',
  imports:[CommonModule, FormsModule],
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
 
  onSubmit(form: any) {
    if (form.valid) {
      this.transactions.push({ ...this.debitModel });
      console.log('Form submitted:', this.debitModel);
      form.resetForm(); // resets form and model
    }
  }
}