import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myexpenses',
  imports: [RouterModule, NavbarComponent, CommonModule],
  templateUrl: './myexpenses.component.html',
  styleUrl: './myexpenses.component.css'
})
export class MyexpensesComponent implements OnInit {
  expenses: Array<{ name: string, price: number, category: string }> = [];
  selectedCategory: string | null = null;

  ngOnInit() {
    // Load expenses from localStorage or initialize with an empty array
    const storedExpenses = localStorage.getItem('expenses');
    this.expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
  }

  getTotalPrice(): number {
    return this.expenses
      .filter(expense => !this.selectedCategory || expense.category === this.selectedCategory)
      .reduce((total, expense) => total + expense.price, 0);
  }

}
