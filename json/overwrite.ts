/*
 * This script is used to generate JSON files that are used in the client side
 * to generate the filter options.
 * The JSON files are generated from the database.
 *
 * This script must be run in Node.js.
 */

import { Cpu } from "@/db/Cpu";
import { Gpu } from "@/db/Gpu";
import { Memory } from "@/db/Memory";
import { Motherboard } from "@/db/Motherboard";
import { Ssd } from "@/db/Ssd";
import initSqlJs from "sql.js";
import { DataSource } from "typeorm";
import fs from "fs";

declare global {
  var SQL: initSqlJs.SqlJsStatic;
}

async function overwriteCpu(dataSource: DataSource) {
  const coreCountList = await dataSource
    .getRepository(Cpu)
    .createQueryBuilder("cpu")
    .select("DISTINCT core_count")
    .where("core_count IS NOT NULL")
    .orderBy("core_count")
    .getRawMany();

  const socketList = await dataSource
    .getRepository(Cpu)
    .createQueryBuilder("cpu")
    .select("DISTINCT socket")
    .where("socket IS NOT NULL")
    .orderBy("socket")
    .getRawMany();

  const data = JSON.stringify(
    {
      core_count: coreCountList.map((x) => x.core_count),
      socket: socketList.map((x) => x.socket),
    },
    null,
    2,
  );

  fs.writeFileSync("./json/cpu.json", data + "\n");
}

async function overwriteMemory(dataSource: DataSource) {
  const capacityList = await dataSource
    .getRepository(Memory)
    .createQueryBuilder("memory")
    .select("DISTINCT capacity")
    .where("capacity != ''")
    .orderBy("capacity")
    .getRawMany();

  const pcsList = await dataSource
    .getRepository(Memory)
    .createQueryBuilder("memory")
    .select("DISTINCT pcs")
    .where("pcs IS NOT NULL")
    .orderBy("pcs")
    .getRawMany();

  const standardList = await dataSource
    .getRepository(Memory)
    .createQueryBuilder("memory")
    .select("DISTINCT standard")
    .where("standard != ''")
    .orderBy("standard")
    .getRawMany();

  const interfaceList = await dataSource
    .getRepository(Memory)
    .createQueryBuilder("memory")
    .select("DISTINCT interface")
    .where("interface != ''")
    .orderBy("interface")
    .getRawMany();

  const data = JSON.stringify(
    {
      capacity: capacityList.map((x) => x.capacity),
      pcs: pcsList.map((x) => x.pcs),
      standard: standardList.map((x) => x.standard),
      interface: interfaceList.map((x) => x.interface),
    },
    null,
    2,
  );

  fs.writeFileSync("./json/memory.json", data + "\n");
}

async function overwriteMotherboard(dataSource: DataSource) {
  const formFactorList = await dataSource
    .getRepository(Motherboard)
    .createQueryBuilder("motherboard")
    .select("DISTINCT form_factor")
    .where("form_factor != ''")
    .orderBy("form_factor")
    .getRawMany();

  const socketList = await dataSource
    .getRepository(Motherboard)
    .createQueryBuilder("motherboard")
    .select("DISTINCT socket")
    .where("socket != ''")
    .andWhere("socket NOT LIKE '%Onboard%'")
    .orderBy("socket")
    .getRawMany();

  const chipsetList = await dataSource
    .getRepository(Motherboard)
    .createQueryBuilder("motherboard")
    .select("DISTINCT chipset")
    .where("chipset != ''")
    .orderBy("chipset")
    .getRawMany();

  const memoryList = await dataSource
    .getRepository(Motherboard)
    .createQueryBuilder("motherboard")
    .select("DISTINCT memory")
    .where("memory != ''")
    .orderBy("memory")
    .getRawMany();

  const data = JSON.stringify(
    {
      form_factor: formFactorList.map((x) => x.form_factor),
      socket: socketList.map((x) => x.socket),
      chipset: chipsetList.map((x) => x.chipset),
      memory: memoryList.map((x) => x.memory),
    },
    null,
    2,
  );

  fs.writeFileSync("./json/motherboard.json", data + "\n");
}

async function overwriteGpu(dataSource: DataSource) {
  const gpuNameList = await dataSource
    .getRepository(Gpu)
    .createQueryBuilder("gpu")
    .select("DISTINCT gpu_name")
    .where("gpu_name != ''")
    .andWhere("gpu_name NOT LIKE '%ATI%'")
    .andWhere("gpu_name NOT LIKE '%MATROX%'")
    .orderBy("gpu_name")
    .getRawMany();

  const busInterfaceList = await dataSource
    .getRepository(Gpu)
    .createQueryBuilder("gpu")
    .select("DISTINCT bus_interface")
    .where("bus_interface != ''")
    .andWhere("bus_interface LIKE '%PCI%'")
    .orderBy("bus_interface")
    .getRawMany();

  const standardList = await dataSource
    .getRepository(Gpu)
    .createQueryBuilder("gpu")
    .select("DISTINCT standard")
    .where("standard != ''")
    .orderBy("standard")
    .getRawMany();

  const capacityList = await dataSource
    .getRepository(Gpu)
    .createQueryBuilder("gpu")
    .select("DISTINCT capacity")
    .where("capacity != ''")
    .orderBy("capacity")
    .getRawMany();

  const data = JSON.stringify(
    {
      gpu_name: gpuNameList.map((x) => x.gpu_name),
      bus_interface: busInterfaceList.map((x) => x.bus_interface),
      standard: standardList.map((x) => x.standard),
      capacity: capacityList.map((x) => x.capacity),
    },
    null,
    2,
  );

  fs.writeFileSync("./json/gpu.json", data + "\n");
}

async function overwriteSsd(dataSource: DataSource) {
  const capacityList = await dataSource
    .getRepository(Ssd)
    .createQueryBuilder("ssd")
    .select("DISTINCT capacity")
    .where("capacity != ''")
    .orderBy("capacity")
    .getRawMany();

  const sizeList = await dataSource
    .getRepository(Ssd)
    .createQueryBuilder("ssd")
    .select("DISTINCT size")
    .where("size != ''")
    .orderBy("size")
    .getRawMany();

  const interfaceList = await dataSource
    .getRepository(Ssd)
    .createQueryBuilder("ssd")
    .select("DISTINCT interface")
    .where("interface != ''")
    .andWhere("interface NOT LIKE '%USB%'")
    .orderBy("interface")
    .getRawMany();

  const data = JSON.stringify(
    {
      capacity: capacityList.map((x) => x.capacity),
      size: sizeList.map((x) => x.size),
      interface: interfaceList.map((x) => x.interface),
    },
    null,
    2,
  );

  fs.writeFileSync("./json/ssd.json", data + "\n");
}

async function main() {
  const sql = await initSqlJs();
  globalThis.SQL = sql;

  const response = await fetch("https://bucket.nunawa.net/parts_latest.db");
  const buf = await response.arrayBuffer();

  const dataSource = new DataSource({
    type: "sqljs",
    entities: [Cpu, Memory, Motherboard, Gpu, Ssd],
    database: new Uint8Array(buf),
  });

  await dataSource.initialize();

  await overwriteCpu(dataSource);
  await overwriteMemory(dataSource);
  await overwriteMotherboard(dataSource);
  await overwriteGpu(dataSource);
  await overwriteSsd(dataSource);
}

main();
