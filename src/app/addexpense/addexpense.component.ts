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
  isEditing: boolean = false;
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['']
    });

    // Load existing expenses from localStorage
    const storedExpenses = localStorage.getItem('expenses');
    this.expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
  }

  onSubmit() {
    const expense = this.expenseForm.value;

    if (this.isEditing && this.editingIndex !== null) {
      // Update the existing expense
      this.expenses[this.editingIndex] = expense;
      this.isEditing = false;
      this.editingIndex = null;
    } else {
      // Add a new expense
      this.expenses.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.expenseForm.reset();
  }
  ngOnInit() {
    // Load existing expenses from localStorage
    const storedExpenses = localStorage.getItem('expenses');
    this.expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
  
    // Check if there's an expense to edit
    const editingExpense = localStorage.getItem('editingExpense');
    if (editingExpense) {
      const expense = JSON.parse(editingExpense);
      this.expenseForm.patchValue(expense);
      this.isEditing = true;
      this.editingIndex = this.expenses.findIndex(e => e.name === expense.name && e.price === expense.price && e.category === expense.category);
      localStorage.removeItem('editingExpense'); // Clear the editing expense from localStorage
    }
  }
  onEdit(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    const expense = this.expenses[index];
    this.expenseForm.patchValue(expense);
  }

  onDelete(index: number) {
    this.expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }
}