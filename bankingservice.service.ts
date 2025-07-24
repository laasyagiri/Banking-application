import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
 
interface User{
  id: number;
  username:string;
  accno:number;
  balance:number;
}
export interface Transaction {
  accno: number;
  type: 'credit' | 'debit' | 'transfer';
  amount: number;
  date: string;

}
 
@Injectable({
  providedIn: 'root'
})
 
export class BankingserviceService {
//http=Inject(HttpClient);
baseURL:string='http://localhost:3000/users'
transactionURL: string = 'http://localhost:3000/transactions';
  constructor(private http:HttpClient) { }
 
 registerUser(user: any): Observable<any> {
  return this.http.post(this.baseURL, user);
}
getUserByAccNo(accno: number): Observable<any> {
  return this.http.get<any[]>(`${this.baseURL}?accno=${accno}`);
}
 
creditAmount(accno: number, amount: number): Observable<any> {
  return this.getUserByAccNo(accno).pipe(
    switchMap(users => {
      if (!users || users.length === 0) {
        throw new Error('User not found');
      }
 
      const user = users[0];
      const updatedBalance = user.balance + amount;
 
      const updatedUser = { ...user, balance: updatedBalance };
 
      console.log('User found:', user);
      console.log('Updated user:', updatedUser);
 
      return this.http.put(`${this.baseURL}/${user.id}`, updatedUser);
    })
  );
}
 
debitAmount(accno: number, amount: number): Observable<any> {
  return this.getUserByAccNo(accno).pipe(
    switchMap(users => {
      if (!users || users.length === 0) {
        throw new Error('User not found');
      }
 
      const user = users[0];
 
      // Validate sufficient balance
      if (user.balance < amount) {
        throw new Error('Insufficient balance');
      }
 
      const updatedBalance = user.balance - amount;
      const updatedUser = { ...user, balance: updatedBalance };
 
      console.log('Withdrawal processed for:', user);
      console.log('Updated user after debit:', updatedUser);
 
      return this.http.put(`${this.baseURL}/${user.id}`, updatedUser);
    })
  );
}
transferAmount(fromAccno: number, toAccno: number, amount: number): Observable<any> {
  return this.getUserByAccNo(fromAccno).pipe(
    switchMap(fromUsers => {
      if (!fromUsers || fromUsers.length === 0) {
        throw new Error('Sender not found');
      }
 
      const fromUser = fromUsers[0];
 
      if (fromUser.balance < amount) {
        throw new Error('Insufficient balance in sender account');
      }
 
      const updatedFromUser = { ...fromUser, balance: fromUser.balance - amount };
 
      return this.http.put(`${this.baseURL}/${fromUser.id}`, updatedFromUser).pipe(
        switchMap(() => {
          return this.getUserByAccNo(toAccno).pipe(
            switchMap(toUsers => {
              if (!toUsers || toUsers.length === 0) {
                throw new Error('Receiver not found');
              }
 
              const toUser = toUsers[0];
              const updatedToUser = { ...toUser, balance: toUser.balance + amount };
 
              return this.http.put(`${this.baseURL}/${toUser.id}`, updatedToUser);
            })
          );
        })
      );
    })
  );
}

 
recordTransaction(txn: Transaction): Observable<any> {
  return this.http.post(this.transactionURL, txn); // ✅ fixed
}
 
getTransactionsByAccno(accno: number): Observable<Transaction[]> {
  return this.http.get<Transaction[]>(`${this.transactionURL}?accno=${accno}`); // ✅ fixed
}
 
 
}