import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-editexpenses',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './editexpenses.component.html',
  styleUrl: './editexpenses.component.css'
})
export class EditexpensesComponent {

}
