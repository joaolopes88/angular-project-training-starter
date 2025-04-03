import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  expenses: Array<{ name: string, quantity: number, category: string, price: number, date: string, description: string }> = [];
  pieChart: Chart | null = null;
  barChart: Chart | null = null;

  constructor() {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit() {
    // Example data - replace this with data from localStorage or an API
    const storedExpenses = localStorage.getItem('expenses');
    this.expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
  }

  ngAfterViewInit() {
    this.createPieChart();
    this.createBarChart();
  }

  createPieChart() {
    const categoryTotals = this.calculateCategoryTotals();

    const data = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: 'Total Spent',
          data: Object.values(categoryTotals),
          backgroundColor: [
            '#FF6384', // Red
            '#36A2EB', // Blue
            '#FFCE56', // Yellow
            '#4BC0C0', // Teal
          ],
          hoverOffset: 4
        }
      ]
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    };

    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx) {
      this.pieChart = new Chart(ctx, config);
    }
  }

  createBarChart() {
    const dateTotals = this.calculateDateTotals();

    // Sort dates by total price in descending order and take the top 3
    const sortedDates = Object.entries(dateTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const data = {
      labels: sortedDates.map(entry => entry[0]), // Top 3 dates
      datasets: [
        {
          label: 'Total Price',
          data: sortedDates.map(entry => entry[1]), // Corresponding total prices
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for bars
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Border colors
          borderWidth: 1
        }
      ]
    };

    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Hide legend for bar chart
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Dates'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Price (€)'
            },
            beginAtZero: true
          }
        }
      }
    };

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (ctx) {
      this.barChart = new Chart(ctx, config);
    }
  }

  calculateCategoryTotals(): { [key: string]: number } {
    const categoryTotals: { [key: string]: number } = {};

    // Calculate total price for each category
    this.expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += (expense.price*expense.quantity);
      } else {
        categoryTotals[expense.category] = (expense.price*expense.quantity);
      }
    });

    return categoryTotals;
  }
  
  calculateDateTotals(): { [key: string]: number } {
    const dateTotals: { [key: string]: number } = {};

    // Calculate total price for each date
    this.expenses.forEach(expense => {
      if (dateTotals[expense.date]) {
        dateTotals[expense.date] += expense.price * expense.quantity;
      } else {
        dateTotals[expense.date] = expense.price * expense.quantity;
      }
    });

    return dateTotals;
  }
}