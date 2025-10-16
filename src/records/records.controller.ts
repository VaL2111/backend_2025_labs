import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { RecordsService } from "./records.service";
import { CreateRecordDto } from "./dto/create-record.dto";

@Controller("record")
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  findAll(
    @Query("user_id") userId?: string,
    @Query("category_id") categoryId?: string,
  ) {
    return this.recordsService.findAllFiltered(userId, categoryId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.recordsService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.recordsService.remove(id);
  }
}
