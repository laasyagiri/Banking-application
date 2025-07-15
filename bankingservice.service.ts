import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

interface User{
  id: number;
  username:string;
  accno:number;
  balance:number;
}

@Injectable({
  providedIn: 'root'
})

export class BankingserviceService {
//http=Inject(HttpClient);
baseURL:string='http://localhost:3000/users'
  constructor(private http:HttpClient) { }

  
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

}



