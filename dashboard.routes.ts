import { Routes } from "@angular/router";
import { LogoutComponent } from "../logout/logout.component";
import { TransferComponent } from "../transfer/transfer.component";
import { CreditComponent } from "../credit/credit.component";
import { DebitComponent } from "../debit/debit.component";
import { HomeComponent } from "../home/home.component";
import { authGuard } from "../auth.guard";
export const dashboardRoutes:Routes=[
    {path:'transfer', component:TransferComponent, canActivate: [authGuard]},
    {path:'logout',component:LogoutComponent, canActivate: [authGuard]},
    {path:'credit', component: CreditComponent, canActivate: [authGuard]},
    {path:'debit', component: DebitComponent, canActivate: [authGuard]},
{path:'home', component: HomeComponent, canActivate: [authGuard]}
];