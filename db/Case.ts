import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("case")
export class Case {
  @PrimaryColumn("text")
  id!: string;

  @Column("text", { nullable: true })
  name!: string | null;

  @Column("bigint", { nullable: true })
  price!: number | null;

  @Column("bigint", { nullable: true })
  sales_rank!: string | null;

  @Column("float", { nullable: true })
  review_score!: number | null;

  @Column("bigint", { nullable: true })
  bbs_count!: number | null;

  @Column("text", { nullable: true })
  date!: string | null;

  @Column("text", { nullable: true })
  manufacturer!: string | null;

  @Column("text", { nullable: true })
  support_motherboard!: string | null;

  @Column("boolean", { nullable: true })
  psu_included!: boolean | null;

  @Column("text", { nullable: true })
  support_psu!: string | null;

  @Column("text", { nullable: true })
  slot!: string | null;

  @Column("text", { nullable: true })
  size!: string | null;

  @Column("float", { nullable: true })
  volume!: number | null;
}
