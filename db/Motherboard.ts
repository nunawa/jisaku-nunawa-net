import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Motherboard {
  @PrimaryColumn("text")
  id!: string;

  @Column("text", { nullable: true })
  name!: string | null;

  @Column("bigint", { nullable: true })
  price!: number | null;

  @Column("bigint", { nullable: true })
  sales_rank!: number | null;

  @Column("float", { nullable: true })
  review_score!: number | null;

  @Column("bigint", { nullable: true })
  bbs_count!: number | null;

  @Column("text", { nullable: true })
  date!: string | null;

  @Column("text", { nullable: true })
  manufacturer!: string | null;

  @Column("text", { nullable: true })
  form_factor!: string | null;

  @Column("text", { nullable: true })
  socket!: string | null;

  @Column("text", { nullable: true })
  chipset!: string | null;

  @Column("text", { nullable: true })
  memory!: string | null;

  @Column("text", { nullable: true })
  gpu!: string | null;
}
