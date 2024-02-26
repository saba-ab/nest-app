import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expnese/expense.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ExpenseModule,
    MongooseModule.forRoot('mongodb://localhost/expenses'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
