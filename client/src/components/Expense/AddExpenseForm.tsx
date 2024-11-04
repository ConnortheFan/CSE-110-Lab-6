import React, { useState, useContext } from "react";
import { AppContext, AppProvider } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";


const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  // const expenses = useContext(AppContext).expenses;
  // const setExpenses = useContext(AppContext).setExpenses;
  
  const {expenses, setExpenses} = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  // Exercise: Add add new expense to expenses context array
  
    const newExpense: Expense = {id : (new Date().getTime()).toString(), description : name, cost: cost };
    // console.log(expenses);
    createExpense(newExpense);
    const updatedExpenses = [...expenses, newExpense];
    // console.log(expenses);
    
    setExpenses(updatedExpenses);
    console.log(expenses); 
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            placeholder="Expense Name"
            data-testid ="expenseName"
            className="form-control"
            id="name"
            value={name}
            // HINT: onChange={}
            onChange={(event) => 
              setName(event.target.value)
            }
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            placeholder="123"
            data-testid ="expenseCost"
            className="form-control"
            id="cost"
            value={cost}
            // HINT: onChange={}
            onChange={(event) => 
              setCost(event.target.valueAsNumber)
            }
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" 
          className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
