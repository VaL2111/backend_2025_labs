import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("user")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("users")
  findAll() {
    return this.usersService.findAll();
  }

  @Get("user/:id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Delete("user/:id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
