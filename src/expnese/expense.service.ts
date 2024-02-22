// import { Expense } from './expense.model';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Expense, ExpenseDocument } from './expense.schema';
import e from 'express';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
  ) {}
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      const newExpense = new this.expenseModel(createExpenseDto);
      return await newExpense.save();
    } catch (e) {
      throw new HttpException(
        'expense cant be created',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findAll(): Promise<ExpenseDocument[]> {
    try {
      return await this.expenseModel.find().exec();
    } catch (e) {
      throw new HttpException('expenses not found', HttpStatus.NOT_FOUND);
    }
  }
  async findExpense(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return expense;
  }
  async updateExpense(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const updatedExpense = this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
      .exec();
    if (!updatedExpense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return updatedExpense;
  }
  async deleteExpense(id: string): Promise<Expense> {
    const expense = this.expenseModel.findById(id);
    const deletedExpense = this.expenseModel.findByIdAndDelete(id).exec();
    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    return deletedExpense;
  }
}
