import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiGuard } from 'src/guards/api.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  // @UseGuards(ApiGuard)
  async getAllExpenses() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  // @UseGuards(ApiGuard)
  async getOneExpense(@Param('id') id: string) {
    return this.expenseService.findExpense(id);
  }

  @Post()
  // @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Put(':id')
  // @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async modifyExpense(
    @Param('id') id: string,
    updateExpense: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(id, updateExpense);
  }

  @Delete(':id')
  // @UseGuards(AdminGuard)
  async deleteExpense(@Param('id') id: string) {
    return this.expenseService.deleteExpense(id);
  }
}
