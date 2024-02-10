import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  async getAllExpenses() {
    return this.expenseService.allExpenses();
  }

  @Get(':id')
  async getOneExpense(@Param('id') id: number) {
    return this.expenseService.findExpense(+id);
  }

  @Post()
  async createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.createExpense(createExpenseDto);
  }

  @Put(':id')
  async modifyExpense(
    @Param('id') id: number,
    updateExpense: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(+id, updateExpense);
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: number) {
    return this.expenseService.deleteExpense(+id);
  }
}
