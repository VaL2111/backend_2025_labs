import { Module } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { RecordsController } from "./records.controller";
import { UsersModule } from "src/users/users.module";
import { CategoriesModule } from "src/categories/categories.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Record } from "./entities/record.entity";

@Module({
  imports: [UsersModule, CategoriesModule, TypeOrmModule.forFeature([Record])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
