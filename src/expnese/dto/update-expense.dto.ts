import { IsInt, IsString, Min, Max, IsNotEmpty, IsDate } from 'class-validator';

export class UpdateExpenseDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsInt()
  @Min(0)
  @Max(5000)
  cost?: number;

  @IsDate()
  date?: Date;
}
