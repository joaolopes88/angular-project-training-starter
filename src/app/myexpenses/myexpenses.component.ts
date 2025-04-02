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
  // Array para guardar a lista de despesas
  expenses: Array<{ name: string, quantity: number, category: string, price: number, date: string, description: string }> = [];
  sortColumn: string = '';
  sortDirection: boolean = true; // true for ascending, false for descending
  
  ngOnInit() {
    // carrega as despesas do localStorage
    const storedExpenses = localStorage.getItem('expenses');
    this.expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    //this.router.navigate(['/myexpenses']);
  }

  getTotalPrice(): number {
    return this.expenses
      .reduce((total, expense) => total + (expense.price * expense.quantity), 0);
  }

  onEdit(index: number) {

    const expense = this.expenses[index];
    localStorage.setItem('editingExpense', JSON.stringify(expense));
    window.location.href = '/addexpense'; 
  }

  onDelete(index: number) {
    this.expenses.splice(index, 1);
    // atualiza o localStorage
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  sortTable(column: keyof typeof this.expenses[0]) {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection; // Toggle sorting direction
    } else {
      this.sortColumn = column;
      this.sortDirection = true; // Default to ascending
    }
  
    this.expenses.sort((a, b) => {
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