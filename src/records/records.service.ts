import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRecordDto } from "./dto/create-record.dto";
import { UsersService } from "src/users/users.service";
import { CategoriesService } from "src/categories/categories.service";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Record } from "./entities/record.entity";

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,

    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    await this.usersService.findOne(createRecordDto.userId);
    await this.categoriesService.findOne(createRecordDto.categoryId);

    const newRecord = this.recordRepository.create({
      amount: createRecordDto.amount,
      user: { id: createRecordDto.userId },
      category: { id: createRecordDto.categoryId },
    });

    return this.recordRepository.save(newRecord);
  }

  async findAllFiltered(
    userId?: string,
    categoryId?: string,
  ): Promise<Record[]> {
    if (!userId && !categoryId) {
      throw new BadRequestException(
        "At least one filter parameter (user_id or category_id) must be provided.",
      );
    }

    const whereClause: FindOptionsWhere<Record> = {};

    if (userId) {
      whereClause.user = { id: userId };
    }
    if (categoryId) {
      whereClause.category = { id: categoryId };
    }

    return this.recordRepository.find({ where: whereClause });
  }

  async findOne(id: string): Promise<Record> {
    const record = await this.recordRepository.findOneBy({ id: id });
    if (!record) {
      throw new NotFoundException(`Record with ID #${id} not found.`);
    }
    return record;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.recordRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Record with ID #${id} not found.`);
    }
    return { message: `Record with ID #${id}  successfully deleted.` };
  }
}
