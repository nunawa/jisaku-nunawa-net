import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cpu {
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
  cpu_name!: string | null;

  @Column("text", { nullable: true })
  codename!: string | null;

  @Column("float", { nullable: true })
  frequency!: number | null;

  @Column("text", { nullable: true })
  socket!: string | null;

  @Column("bigint", { nullable: true })
  core_count!: number | null;

  @Column("bigint", { nullable: true })
  thread_count!: number | null;

  @Column("text", { nullable: true })
  gpu!: string | null;

  @Column("bigint", { nullable: true })
  multi_thread_score!: number | null;

  @Column("bigint", { nullable: true })
  single_thread_score!: number | null;

  @Column("bigint", { nullable: true })
  tdp!: number | null;
}
