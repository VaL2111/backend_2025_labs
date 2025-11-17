import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CurrencyService } from "../currency/currency.service";
import { Currency } from "../currency/entities/currency.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly currencyService: CurrencyService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let uahCurrency: Currency;
    try {
      uahCurrency = await this.currencyService.findOneByCode("UAH");
    } catch (error) {
      throw new InternalServerErrorException(
        `Base currency "UAH" not found: ${error}`,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      defaultCurrency: uahCurrency,
    });
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found.`);
    }
    return user;
  }

  async setDefaultCurrency(userId: string, currencyId: string): Promise<User> {
    await this.findOne(userId);
    await this.currencyService.findOne(currencyId);
    await this.userRepository.update(userId, { defaultCurrencyId: currencyId });

    return this.findOne(userId);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID #${id} not found.`);
    }
    return { message: `User with ID #${id} successfully deleted.` };
  }
}
