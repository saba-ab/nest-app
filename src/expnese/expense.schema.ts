import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Expense {
  @Prop()
  name: string;

  @Prop({ index: true })
  cost: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
