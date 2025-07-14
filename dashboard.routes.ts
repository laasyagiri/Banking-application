import { Routes } from "@angular/router";
import { LogoutComponent } from "../logout/logout.component";
import { TransferComponent } from "../transfer/transfer.component";
import { CreditComponent } from "../credit/credit.component";
import { DebitComponent } from "../debit/debit.component";
export const dashboardRoutes:Routes=[
    {path:'transfer', component:TransferComponent},
    {path:'logout',component:LogoutComponent},
    {path:'credit', component: CreditComponent},
    {path:'debit', component: DebitComponent}

];