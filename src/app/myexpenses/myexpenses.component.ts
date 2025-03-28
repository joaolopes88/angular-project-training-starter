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
  expenses: Array<{ name: string, price: number, category: string }> = [];

  // Indica o índice da despesa que está a ser editada; null significa que nenhuma despesa está a ser editada no momento
  editingIndex: number | null = null;

  router: any;

  ngOnInit() {
    // carrega as despesas do localStorage
    const storedExpenses = localStorage.getItem('expenses');
    this.expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
    //this.router.navigate(['/myexpenses']);
  }

  getTotalPrice(): number {
    return this.expenses
      .reduce((total, expense) => total + expense.price, 0);
  }

  onEdit(index: number) {
    // leva para a página de edição 
    this.editingIndex = index;
    const expense = this.expenses[index];
    localStorage.setItem('editingExpense', JSON.stringify(expense));
    window.location.href = '/addexpense'; 
  }

  onDelete(index: number) {
    this.expenses.splice(index, 1);
    // atualiza o localStorage
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }
}