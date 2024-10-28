
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { Expense } from "../../types/types";
import { fetchBudget } from "../../utils/budget-utils";

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
        const budget = await fetchBudget();
        setBudget(budget)
        
      } catch (err: any) {
        console.log(err.message);
      }
      };
      
     // const {budget, setBudget} = useEffect
      // const { budget } = useContext(AppContext);
    
      const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const newBudget: number = budget;
        console.log(budget);
        updateBudget(newBudget);
        
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
function updateBudget(newBudget: number) {
  throw new Error("Function not implemented.");
}

