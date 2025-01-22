import { useState } from "react";
import "./app.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import tempExpenseData from "./tempExpenseData";

const App = () => {
  const [expenses, setExpenses] = useState(tempExpenseData);
  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm setExpenses={setExpenses} />
        <ExpenseTable expenses={expenses} />
      </div>
    </main>
  );
};

export default App;
