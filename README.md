# Angular Assessment Project: Expense Manager App

## 🎯 Objective
Build a functional Expense Manager App using Angular that demonstrates key frontend development skills in a real-world scenario.

---

## 📌 Project Requirements

### 🔸 Core Features (Mandatory)
- Add New Expense (Form with validation)
- Edit Existing Expense
- Delete Expense
- View Expense List (Table or Card layout)
- Filter Expenses by Category and/or Date Range
- Categorize Expenses (e.g., Food, Travel, Utilities, Others)
- View Dashboard with total expenses summary
- Use Angular Routing:
  - `/dashboard`
  - `/expenses`
  - `/add-expense`
  - `/edit-expense/:id`

### 🔸 Technical Expectations
- Use **Angular Reactive Forms** for Add/Edit Expense
- Create and inject **services** for handling data (ExpenseService, CategoryService)
- Use **RxJS Observables** where applicable
- Structure code using **feature modules** (e.g., ExpenseModule, DashboardModule)
- Apply **form validation rules**
- Use clean and reusable **components** and **pipes** if needed

---

## 🧰 Tools & Libraries
- Angular CLI
- Angular Forms (Reactive)
- Angular Router
- RxJS
- Optionally: ngx-charts, Bootstrap/Tailwind/Material

---

## 📁 Suggested Folder Structure
```
src/
|-- app/
|   |-- core/
|   |-- shared/
|   |-- expenses/
|   |   |-- components/
|   |   |-- services/
|   |-- dashboard/
|   |-- auth/ (optional)
|   |-- app-routing.module.ts
|   |-- app.module.ts
```

---

## ✅ Evaluation Checklist
| Criteria                          | Weight | Notes                                                 |
| --------------------------------- | ------ | ----------------------------------------------------- |
| Component & Module Structure      | 10     | Clean separation and modularity                       |
| Form Implementation & Validation  | 10     | Reactive forms, good validation logic                 |
| Routing & Navigation              | 10     | Routes are defined and working properly               |
| Use of Services & DI              | 10     | Expense and category logic abstracted from components |
| Observables/RxJS Usage            | 10     | Usage of RxJS in filtering, services, etc.            |
| Code Quality & Clean Architecture | 10     | Maintainable, readable, reusable code                 |
| UI/UX Design                      | 10     | Responsive, user-friendly interface                   |
| Unit Testing                      | 10     | Coverage and test structure                           |
| Git Practices                     | 10     | Commit messages, branches, README                     |

---

## 📤 Deliverables
- GitHub repository link
- Working Angular app
- README.md with project setup instructions, features, and known limitations
