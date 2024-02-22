import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expnese/expense.module';
@Module({
  imports: [ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
