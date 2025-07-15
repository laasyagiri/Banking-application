import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = '';
  accno: number = 0;
  balance: number = 0;

  ngOnInit(): void {
    this.loadUserData();

    // Optional: auto-refresh every few seconds
    setInterval(() => {
      this.loadUserData();
    }, 100); // refresh every 3 seconds
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
}
