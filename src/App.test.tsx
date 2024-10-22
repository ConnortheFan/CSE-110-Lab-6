import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { AppContext, AppProvider } from "./context/AppContext";
import { Expense } from "./types/types";


// add Expense

test("creates a new expense", () => {
  render(<App />);

  // Please make sure your sticky note has a title and content input field with the following placeholders.
  const createExpenseNameInput = screen.getByTestId("expenseName");
  const createExpenseCost =
  screen.getByTestId("expenseCost");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "ABCDE" } });
  fireEvent.change(createExpenseCost, {
    target: { value: 123 },
  });
  fireEvent.click(createExpenseButton);

  const newExpenseName = screen.getByText("ABCDE");
  const newExpenseCost = screen.getByText("$123");

  expect(newExpenseName).toBeInTheDocument();
  expect(newExpenseCost).toBeInTheDocument();
});


// add Expense , cost is negative
test("creates a new expense, cost negative", () => {
  render(<App />);

  // Please make sure your sticky note has a title and content input field with the following placeholders.
  const createExpenseNameInput = screen.getByTestId("expenseName");
  const createExpenseCost =
  screen.getByTestId("expenseCost");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "ABCDE" } });
  fireEvent.change(createExpenseCost, {
    target: { value: -123 },
  });
  fireEvent.click(createExpenseButton);

  const newExpenseName = screen.getByText("ABCDE");
  const newExpenseCost = screen.getByText("$-123");

  expect(newExpenseName).toBeInTheDocument();
  expect(newExpenseCost).toBeInTheDocument();
});

// Delete an Expense

test("delete an expense", () => {
  render(<App />);

  // Please make sure your sticky note has a title and content input field with the following placeholders.
  const createExpenseNameInput = screen.getByTestId("expenseName");
  const createExpenseCost =
  screen.getByTestId("expenseCost");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "ABCDE" } });
  fireEvent.change(createExpenseCost, {
    target: { value: 123 },
  });
  fireEvent.click(createExpenseButton);
  
  const newExpenseName = screen.getByText("ABCDE");
  const newExpenseCost = screen.getByText("$123");
  const deleteExpenseButton = screen.getByText("x");
  fireEvent.click(deleteExpenseButton);

  expect(newExpenseName).not.toBeInTheDocument();
  expect(newExpenseCost).not.toBeInTheDocument();
});

// make sure Remaining is calculated correctly

test("Calculate the remaining budget", () => {
  render(<App />);

  // Please make sure your sticky note has a title and content input field with the following placeholders.
  const createExpenseNameInput = screen.getByTestId("expenseName");
  const createExpenseCost =
  screen.getByTestId("expenseCost");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "ABCDE" } });
  fireEvent.change(createExpenseCost, {
    target: { value: 123 },
  });
  fireEvent.click(createExpenseButton);
  
  const newExpenseName = screen.getByText("ABCDE");
  const newExpenseCost = screen.getByText("$123");
  const newBudget = screen.getByText("Remaining: $9877");
  expect(newBudget).toBeInTheDocument();

  const deleteExpenseButton = screen.getByText("x");
  fireEvent.click(deleteExpenseButton);

  const newBudget10000 = screen.getByText("Remaining: $10000");
  expect(newBudget10000).toBeInTheDocument();
});

// make sure Remaining is calculated correctly, negative

test("Calculate the remaining budget, negative", () => {
  render(<App />);

  // Please make sure your sticky note has a title and content input field with the following placeholders.
  const createExpenseNameInput = screen.getByTestId("expenseName");
  const createExpenseCost =
  screen.getByTestId("expenseCost");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "ABCDE" } });
  fireEvent.change(createExpenseCost, {
    target: { value: -123 },
  });
  fireEvent.click(createExpenseButton);
  
  const newExpenseName = screen.getByText("ABCDE");
  const newExpenseCost = screen.getByText("$-123");
  const newBudget = screen.getByText("Remaining: $10123");
  expect(newBudget).toBeInTheDocument();

  const deleteExpenseButton = screen.getByText("x");
  fireEvent.click(deleteExpenseButton);

  const newBudget10000 = screen.getByText("Remaining: $10000");
  expect(newBudget10000).toBeInTheDocument();
});


// Alert popup should appear
test("Alert popup", () => {
  render(<App />);

  // Please make sure your sticky note has a title and content input field with the following placeholders.
  const createExpenseNameInput = screen.getByTestId("expenseName");
  const createExpenseCost =
  screen.getByTestId("expenseCost");
  const createExpenseButton = screen.getByText("Save");

  fireEvent.change(createExpenseNameInput, { target: { value: "ABCDE" } });
  fireEvent.change(createExpenseCost, {
    target: { value: 20000 },
  });

  const alertMock = jest.spyOn(window,'alert');
  fireEvent.click(createExpenseButton);
  
  const newExpenseName = screen.getByText("ABCDE");
  const newExpenseCost = screen.getByText("$20000");
  
  const newBudget = screen.getByText("Remaining: $-10000");
  expect(newBudget).toBeInTheDocument();
   
  expect(alertMock).toHaveBeenCalledTimes(1);

});