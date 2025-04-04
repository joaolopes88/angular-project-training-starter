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
  expenses: Array<{ name: string, quantity: number, category: string, price: number, date: string, description: string }> = [];
  isEditing: boolean = false;
  editingIndex: number | null = null;
  categoryError: boolean = false;
  predefinedCategories: string[] = ['Food', 'Travel', 'Utilities', 'Others'];

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.maxLength(50)]
    });

    // Load existing expenses from localStorage
    const storedExpenses = localStorage.getItem('expenses');
    this.expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
  }

  onEdit(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    const expense = this.expenses[index];
    this.expenseForm.patchValue(expense);

 


  }

  onSubmit() {
    const expense = this.expenseForm.getRawValue();

    this.validateCategory();
    if (this.expenseForm.invalid || this.categoryError) {
      return;
    }

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
      this.editingIndex = this.expenses.findIndex(e => e.name === expense.name && e.quantity === expense.quantity && e.category === expense.category && e.price === expense.price && e.date === expense.date && e.description === expense.description );
      localStorage.removeItem('editingExpense'); // Clear the editing expense from localStorage
    }
  }

  validateCategory(): void {
    const categoryValue = this.expenseForm.get('category')?.value;
    this.categoryError = !this.predefinedCategories.includes(categoryValue);
  }

  onDelete(index: number) {
    this.expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }
}