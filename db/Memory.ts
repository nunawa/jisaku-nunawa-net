import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("memory")
export class Memory {
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
  capacity!: number | null;

  @Column("bigint", { nullable: true })
  pcs!: number | null;

  @Column("text", { nullable: true })
  standard!: string | null;

  @Column("text", { nullable: true })
  interface!: string | null;

  @Column("bigint", { nullable: true })
  price_per_gb!: number | null;
}
