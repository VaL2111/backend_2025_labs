import { IsEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsEmpty()
  @MinLength(1)
  name: string;
}
