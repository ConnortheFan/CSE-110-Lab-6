
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { Expense } from "../../types/types";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => 
  {

    
    const { budget, setBudget } = useContext(AppContext);
    // 
    useEffect(() => {
      loadBudget();
      }, []);
    
      // Function to load expenses and handle errors
      const loadBudget = async () => {
        try {
          const initialBudget = await fetchBudget();
          setBudget(initialBudget);
        } catch (err: any) {
          console.log(err.message);
        }
      };
    
      const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(budget);
        const newBudget  = await updateBudget(budget);
               
        setBudget(newBudget);
        
        console.log(budget); 
      };
  return (
      <form onSubmit={onSubmit}>
        <div className="col-sm alert alert-secondary p-3 d-flex align-items-center justify-content-between">
          <label htmlFor="Budget">Budget</label>
          <input
            required
            type="number"
            placeholder="123"
            data-testid ="budgetValue"
            className="form-control"
            id="budget"
            value={budget}
            // HINT: onChange={}
            onChange={(event) => 

              setBudget(event.target.valueAsNumber)
            }
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" 
          className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      
    </form>
  );
};

export default Budget;

