import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, LoginComponent],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingComponent {
  bankName = 'SmartBank';
  tagline = 'Secure | Simple | Swift';
}
