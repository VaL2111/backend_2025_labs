import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  name: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      name: createUserDto.name,
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found.`);
    }
    return user;
  }

  remove(id: string): { message: string } {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID #${id} not found.`);
    }
    this.users.splice(userIndex, 1);
    return { message: `User with ID #${id} successfully deleted.` };
  }
}
