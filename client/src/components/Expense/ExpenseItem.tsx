import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const expenses = useContext(AppContext).expenses;
  const setExpenses = useContext(AppContext).setExpenses;
  
  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    deleteExpense(currentExpense.id);
    const updatedExpenses = expenses.filter(expense => expense.id !== currentExpense.id);

  // Set the new array in the state, triggering a re-render
    setExpenses(updatedExpenses);
    
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
