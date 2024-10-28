import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const {id} = req.params;

    for (var i = expenses.length - 1; i >= 0; --i) {
        if (expenses[i].id === id) {
            expenses.splice(i,1);
            //res.status(204).send(id);
        }
    }
    console.log(expenses);
    res.status(200).send({message: "Expense Deleted"});
    //res.status(404).send({ error: "Expense not found" });
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}