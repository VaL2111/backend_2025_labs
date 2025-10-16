import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRecordDto } from "./dto/create-record.dto";
import { UsersService } from "src/users/users.service";
import { CategoriesService } from "src/categories/categories.service";
import { v4 as uuidv4 } from "uuid";

export interface Record {
  id: string;
  userId: string;
  categoryId: string;
  createAt: Date;
  amount: number;
}

@Injectable()
export class RecordsService {
  private readonly records: Record[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  create(createRecordDto: CreateRecordDto): Record {
    this.usersService.findOne(createRecordDto.userId);
    this.categoriesService.findOne(createRecordDto.categoryId);

    const newRecord: Record = {
      id: uuidv4(),
      createAt: new Date(),
      ...createRecordDto,
    };

    this.records.push(newRecord);
    return newRecord;
  }

  findAllFiltered(userId?: string, categoryId?: string): Record[] {
    if (!userId && !categoryId) {
      throw new BadRequestException(
        "At least one filter parameter (user_id or category_id) must be provided.",
      );
    }

    let filteredRecords: Record[] = [...this.records];

    if (userId) {
      filteredRecords = filteredRecords.filter(
        (record) => record.userId === userId,
      );
    }

    if (categoryId) {
      filteredRecords = filteredRecords.filter(
        (record) => record.categoryId === categoryId,
      );
    }

    return filteredRecords;
  }

  findOne(id: string): Record {
    const record: Record | undefined = this.records.find(
      (record) => record.id === id,
    );
    if (!record) {
      throw new NotFoundException(`Record with ID #${id} not found.`);
    }
    return record;
  }

  remove(id: string): { message: string } {
    const recordIndex = this.records.findIndex((record) => record.id === id);
    if (recordIndex === -1) {
      throw new NotFoundException(`Record with ID #${id} not found.`);
    }
    this.records.splice(recordIndex, 1);
    return { message: `Record with ID #${id}  successfully deleted.` };
  }
}
