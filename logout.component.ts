import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(private route:Router){

  }
  ngOnInit(): void {
    this.logout();
  }
  /*logout():void{
    alert('logout successfully');
    this.route.navigate(['/home']);
  }*/
    logout(): void {
      alert('logout successfully');
      
      // Redirect and replace history
      this.route.navigate([''], { replaceUrl: true });
    
      // Prevent back navigation
      history.pushState(null, '', location.href);
      window.onpopstate = () => {
        history.pushState(null, '', location.href);
      };
    }
    
}