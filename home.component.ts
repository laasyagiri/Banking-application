import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BankingserviceService } from '../bankingservice.service';
import { Transaction } from '../bankingservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [BankingserviceService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = '';
  accno: number = 0;
  balance: number = 0;

  transactions: Transaction[] = [];
  fromDate: string = '';
  toDate: string = '';

  constructor(private bankingserviceService: BankingserviceService) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadTransactions();

    // Optional: auto-refresh balance every 3 seconds
    setInterval(() => {
      this.loadUserData();
    }, 3000);
  }

  loadUserData(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.name = user.username;
      this.accno = user.accno;
      this.balance = user.balance;
    }
  }

  loadTransactions(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.bankingserviceService.getTransactionsByAccno(user.accno).subscribe((txns: Transaction[]) => {
      this.transactions = txns
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3); // Show latest 3 by default
    });
  }

  filterTransactionsByDate(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.bankingserviceService.getTransactionsByAccno(user.accno).subscribe((txns: Transaction[]) => {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);

      this.transactions = txns
        .filter(txn => {
          const txnDate = new Date(txn.date);
          return txnDate >= from && txnDate <= to;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }
}
