import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SetDefaultCurrencyDto } from "./dto/set-default-currency.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("user")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put("user/:id/currency")
  setDefaultCurrency(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() setDefaultCurrencyDto: SetDefaultCurrencyDto,
  ) {
    return this.usersService.setDefaultCurrency(
      id,
      setDefaultCurrencyDto.currencyId,
    );
  }

  @Get("users")
  findAll() {
    return this.usersService.findAll();
  }

  @Get("user/:id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Delete("user/:id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
