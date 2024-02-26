import {
  IsString,
  Min,
  Max,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsDateString,
} from 'class-validator';
export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(5000)
  cost: number;
}
