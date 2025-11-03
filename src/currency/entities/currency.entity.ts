import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Record } from "../../records/entities/record.entity";

@Entity({ name: "currencies" })
export class Currency {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 3 })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.defaultCurrency)
  users: User[];

  @OneToMany(() => Record, (record) => record.currency)
  records: Record[];
}
