import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Record } from "../../records/entities/record.entity";
import { Currency } from "../../currency/entities/currency.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];

  @ManyToOne(() => Currency, (currency) => currency.users)
  defaultCurrency: Currency;

  @Column()
  defaultCurrencyId: string;
}
