import { Routes } from '@angular/router';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { MyexpensesComponent } from './myexpenses/myexpenses.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:"addexpense", component: AddexpenseComponent},
    {path: "", component: HomeComponent},
    {path: "myexpenses", component: MyexpensesComponent}
];
