import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { RecordsService } from "./records.service";
import { CreateRecordDto } from "./dto/create-record.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("record")
@UseGuards(JwtAuthGuard)
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  findAll(
    @Query("user_id", ParseUUIDPipe) userId?: string,
    @Query("category_id", ParseUUIDPipe) categoryId?: string,
  ) {
    return this.recordsService.findAllFiltered(userId, categoryId);
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.recordsService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.recordsService.remove(id);
  }
}
