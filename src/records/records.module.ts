import { Module } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { RecordsController } from "./records.controller";
import { UsersModule } from "src/users/users.module";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
  imports: [UsersModule, CategoriesModule],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
