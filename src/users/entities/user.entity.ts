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

  @Column()
  name: string;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];

  @ManyToOne(() => Currency, (currency) => currency.users)
  defaultCurrency: Currency;

  @Column()
  defaultCurrencyId: string;
}
