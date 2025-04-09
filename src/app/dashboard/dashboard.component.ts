import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  expenses: Array<{ name: string, quantity: number, category: string, price: number, date: string, description: string }> = [];
  pieChart: Chart | null = null;
  barChart: Chart | null = null;
  originalPieChartData: { labels: string[]; datasets: any[] } | null = null;

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
          label: 'Total Spent ( € )',
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

    this.originalPieChartData = data;

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const clickedIndex = elements[0].index;
            const clickedCategory = data.labels![clickedIndex];
            this.drillDownPieChart(clickedCategory as string);
          }
        }
      }
    };

    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx) {
      this.pieChart = new Chart(ctx, config);
    }
  }

  drillDownPieChart(category: string) {
    const filteredExpenses = this.expenses.filter(expense => expense.category === category);
  
    const expenseTotals = filteredExpenses.reduce((totals, expense) => {
      totals[expense.name] = (totals[expense.name] || 0) + expense.price * expense.quantity;
      return totals;
    }, {} as { [key: string]: number });
  
    const data = {
      labels: Object.keys(expenseTotals),
      datasets: [
        {
          label: `Total Spent ( € )`,
          data: Object.values(expenseTotals),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
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
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            // Handle further drill-down if needed
          }
        }
      }
    };
  
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx && this.pieChart) {
      this.pieChart.destroy(); // Destroy the existing chart
      this.pieChart = new Chart(ctx, config); // Create a new chart
    }
  }

  drillBackToOriginalPieChart() {
    if (this.originalPieChartData) {
      const config: ChartConfiguration = {
        type: 'pie',
        data: this.originalPieChartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const clickedIndex = elements[0].index;
              const clickedCategory = this.originalPieChartData!.labels![clickedIndex];
              this.drillDownPieChart(clickedCategory as string);
            }
          }
        }
      };

      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
      if (ctx && this.pieChart) {
        this.pieChart.destroy(); // Destroy the existing chart
        this.pieChart = new Chart(ctx, config); // Restore the original chart
      }
    }
  }

  createBarChart(category?: string) {
    const dateTotals = this.calculateDateTotalsByCategory(category);
  
    // Sort dates by total price in descending order and take the top 5
    const sortedDates = Object.entries(dateTotals)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 5);
  
    const data = {
      labels: sortedDates.map(entry => entry[0]), // Top 5 dates
      datasets: [
        {
          label: category ? `Total Spent on ${category} ( € ) ` : 'Total Spent ( € ) ',
          data: sortedDates.map(entry => entry[1]), // Corresponding total prices
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Colors for bars
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Border colors
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
      if (this.barChart) {
        this.barChart.destroy(); // Destroy the existing chart
      }
      this.barChart = new Chart(ctx, config); // Create a new chart
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
  
  calculateDateTotalsByCategory(category?: string): { [key: string]: number } {
    const dateTotals: { [key: string]: number } = {};
  
    // Filter expenses by category if a category is provided
    const filteredExpenses = category
      ? this.expenses.filter(expense => expense.category === category)
      : this.expenses;
  
    // Calculate total price for each date
    filteredExpenses.forEach(expense => {
      if (dateTotals[expense.date]) {
        dateTotals[expense.date] += expense.price * expense.quantity;
      } else {
        dateTotals[expense.date] = expense.price * expense.quantity;
      }
    });
  
    return dateTotals;
  }

  getUniqueCategories(): string[] {
    // Extract unique categories from the expenses
    return [...new Set(this.expenses.map(expense => expense.category))];
  }
  
  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.createBarChart(selectedCategory || undefined); // Pass the selected category to the bar chart
  }
}