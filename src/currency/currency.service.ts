import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCurrencyDto } from "./dto/create-currency.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Currency } from "./entities/currency.entity";
import { Repository } from "typeorm";

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const newCurrency = this.currencyRepository.create(createCurrencyDto);

    try {
      return await this.currencyRepository.save(newCurrency);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === "23505") {
        throw new ConflictException("Currency with this code already exists");
      }
      throw error;
    }
  }

  async findAll(): Promise<Currency[]> {
    return this.currencyRepository.find();
  }

  async findOne(id: string): Promise<Currency> {
    const currency = await this.currencyRepository.findOneBy({ id });
    if (!currency) {
      throw new NotFoundException(`Currency with ID #${id} not found.`);
    }
    return currency;
  }

  async findOneByCode(code: string): Promise<Currency> {
    const currency = await this.currencyRepository.findOneBy({ code: code });
    if (!currency) {
      throw new NotFoundException(`Currency with code #${code} not found.`);
    }
    return currency;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.currencyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Currency with ID #${id} not found.`);
    }
    return { message: `Currency with ID #${id} successfully deleted.` };
  }
}
