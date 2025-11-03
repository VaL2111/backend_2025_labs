import { IsUUID } from "class-validator";

export class SetDefaultCurrencyDto {
  @IsUUID()
  currencyId: string;
}
