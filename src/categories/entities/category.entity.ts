import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Record } from "../../records/entities/record.entity";

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Record, (record) => record.category)
  records: Record[];
}
