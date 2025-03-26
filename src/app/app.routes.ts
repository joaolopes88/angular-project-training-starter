import { Routes } from '@angular/router';
import { MyexpensesComponent } from './myexpenses/myexpenses.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "myexpenses", component: MyexpensesComponent}
];
