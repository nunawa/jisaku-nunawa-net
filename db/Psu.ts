import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("psu")
export class Psu {
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

  @Column("bigint", { nullable: true })
  capacity!: number | null;

  @Column("text", { nullable: true })
  form_factor!: string | null;

  @Column("text", { nullable: true })
  standard!: string | null;

  @Column("text", { nullable: true })
  certification!: string | null;

  @Column("text", { nullable: true })
  size!: string | null;

  @Column("bigint", { nullable: true })
  price_per_watt!: number | null;
}
