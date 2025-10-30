import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";

@Entity({ name: "records" })
export class Record {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "float" })
  amount: number;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => User, (user) => user.records)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Category, (category) => category.records)
  category: Category;

  @Column()
  categoryId: string;
}
