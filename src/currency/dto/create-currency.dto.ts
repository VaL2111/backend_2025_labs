import { IsNotEmpty, IsString, IsUppercase, Length } from "class-validator";

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  @IsUppercase()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
