import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "currencies" })
export class Currency {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 3 })
  code: string;

  @Column()
  name: string;
}
