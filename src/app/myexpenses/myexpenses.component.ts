import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myexpenses',
  imports: [RouterModule, NavbarComponent, CommonModule, FormsModule],
  templateUrl: './myexpenses.component.html',
  styleUrl: './myexpenses.component.css'
})
export class MyexpensesComponent implements OnInit {
  // Array para guardar a lista de despesas
  expenses: Array<{ name: string, quantity: number, category: string, price: number, date: string, description: string }> = [];
  filteredExpenses: Array<{ name: string, quantity: number, category: string, price: number, date: string, description: string }> = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  startDate: string = '';
  endDate: string = '';
  sortColumn: string = '';
  sortDirection: boolean = true; // true for ascending, false for descending
  
  ngOnInit() {
    // carrega as despesas do localStorage
    const storedExpenses = localStorage.getItem('expenses');
    this.expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    this.filteredExpenses = [...this.expenses];
  }

  filterExpenses() {
    const term = this.searchTerm.toLowerCase();
    const category = this.selectedCategory;
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    this.filteredExpenses = this.expenses.filter(expense => {
      const matchesName = expense.name.toLowerCase().includes(term);
      const matchesCategory = category ? expense.category === category : true;
      const expenseDate = new Date(expense.date);
      const matchesDate =
        (!start || expenseDate >= start) &&
        (!end || expenseDate <= end);

      return matchesName && matchesCategory && matchesDate;
    });
  }

  getTotalPrice(): number {
    return this.filteredExpenses.reduce((total, expense) => total + (expense.price * expense.quantity), 0);
  }

  onEdit(index: number) {

    const expense = this.filteredExpenses[index];
    localStorage.setItem('editingExpense', JSON.stringify(expense));
    window.location.href = '/addexpense';
  }

  onDelete(index: number) {
    const expenseToDelete = this.filteredExpenses[index];
    const originalIndex = this.expenses.indexOf(expenseToDelete);
    this.expenses.splice(originalIndex, 1);
    this.filteredExpenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  sortTable(column: keyof typeof this.expenses[0]) {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection; // Toggle sorting direction
    } else {
      this.sortColumn = column;
      this.sortDirection = true; // Default to ascending
    }
  
    this.filteredExpenses.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection ? valueA - valueB : valueB - valueA;
      } else {
        return 0;
      }
    });
  }
}