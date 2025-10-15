import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { v4 as uuidv4 } from "uuid";

export interface Category {
  id: string;
  name: string;
}

@Injectable()
export class CategoriesService {
  private readonly categories: Category[] = [];

  create(createCategoryDto: CreateCategoryDto): Category {
    const newCategory: Category = {
      id: uuidv4(),
      name: createCategoryDto.name,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  findAll(): Category[] {
    return this.categories;
  }

  remove(id: string): { message: string } {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    );
    if (categoryIndex === -1) {
      throw new NotFoundException(`Category with ID #${id} not found.`);
    }
    this.categories.splice(categoryIndex, 1);
    return { message: `Category with ID #${id} successfully deleted.` };
  }
}
