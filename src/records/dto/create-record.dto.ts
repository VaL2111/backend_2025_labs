import { IsNumber, IsOptional, IsPositive, IsUUID } from "class-validator";

export class CreateRecordDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  categoryId: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsUUID()
  currencyId?: string;
}
