import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Record } from "../../records/entities/record.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}
