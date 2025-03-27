import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NavbarComponent, CommonModule]
})
export class AddexpenseComponent {
  expenseForm: FormGroup;
  expenses: Array<{ name: string, price: number, category: string }> = [];

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['']
    });
  }

  onSubmit() {
    const expense = this.expenseForm.value;
    this.expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    //console.log(this.expenses);
    this.expenseForm.reset();
  }
}

