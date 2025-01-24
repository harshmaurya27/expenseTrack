import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import tempExpenseData from "./tempExpenseData";
import { useLocaleStorage } from "./hooks/useLocaleStorage";

const App = () => {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  // useState ke jagah useLocaleStorage
  const [expenses, setExpenses] = useLocaleStorage("expenses", tempExpenseData);

  const [editingRowId, setEditingRowId] = useState("");

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
        />
        <ExpenseTable
          setEditingRowId={setEditingRowId}
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          expense={expense}
        />
      </div>
    </main>
  );
};

export default App;
