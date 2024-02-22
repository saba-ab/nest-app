import { Expense } from './expense.model';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
export class ExpenseService {
  private readonly Expenses: Expense[] = [];

  createExpense(createExpenseDto: CreateExpenseDto) {
    try {
      const lastId = this.Expenses
        ? this.Expenses[this.Expenses.length - 1]?.id
        : 0;
      const newId = lastId ? lastId + 1 : 1;
      const dateNow = new Date().toISOString();
      const expense: Expense = {
        id: newId,
        date: dateNow,
        ...createExpenseDto,
      };
      this.Expenses.push(expense);
      return expense;
    } catch (e) {
      throw new HttpException(
        'failed to create expense',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  allExpenses(): Expense[] {
    if (this.Expenses) {
      return this.Expenses;
    }
    throw new HttpException('expenses not found', HttpStatus.NOT_FOUND);
  }
  findExpense(id: number) {
    const expense = this.Expenses.find((e) => e.id === id);
    if (!expense) {
      throw new HttpException('expense not found', HttpStatus.NOT_FOUND);
    }
    return expense;
  }
  updateExpense(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expenseIndex = this.Expenses.findIndex((e) => e.id === id);
    let oldExpense = this.Expenses[expenseIndex];
    const updatedExpense = { ...oldExpense, ...updateExpenseDto };
    if (expenseIndex === -1) {
      throw new HttpException('expense not found', HttpStatus.NOT_FOUND);
    }
    this.Expenses[expenseIndex] = updatedExpense;
    return updatedExpense;
  }
  deleteExpense(id: number) {
    const expenseIndex = this.Expenses.findIndex((e) => e.id === id);
    const deletedExpense = this.Expenses.splice(expenseIndex, 1);
    if (expenseIndex === -1) {
      throw new HttpException('expense not found', HttpStatus.NOT_FOUND);
    }
    return deletedExpense;
  }
}
