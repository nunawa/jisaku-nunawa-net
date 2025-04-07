"use client";

import PartsTab from "@/components/PartsTab";
import { Case } from "@/db/Case";
import { Cpu } from "@/db/Cpu";
import { Gpu } from "@/db/Gpu";
import { Memory } from "@/db/Memory";
import { Motherboard } from "@/db/Motherboard";
import { Psu } from "@/db/Psu";
import { Ssd } from "@/db/Ssd";
import { productType } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "reflect-metadata";
import initSqlJs from "sql.js";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { DataSource } from "typeorm";

const fetcher: Fetcher<ArrayBuffer, string> = (url) =>
  fetch(url).then((res) => res.arrayBuffer());

function useBuf() {
  const { data } = useSWRImmutable(
    "https://bucket.nunawa.net/parts_latest.db",
    fetcher,
  );

  return {
    buf: data,
  };
}

export default function Page() {
  const { buf } = useBuf();
  const [sql, setSql] = useState<initSqlJs.SqlJsStatic>();
  const [dataSource, setDatasource] = useState<DataSource>();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const entities: Record<productType, Function> = {
    cpu: Cpu,
    memory: Memory,
    motherboard: Motherboard,
    gpu: Gpu,
    ssd: Ssd,
    psu: Psu,
    case: Case,
  };

  const key = pathname.slice(1) as productType;
  const entity = entities[key];

  useEffect(() => {
    initSqlJs({
      locateFile: () =>
        new URL("sql.js/dist/sql-wasm.wasm", import.meta.url).toString(),
    }).then((sql) => {
      setSql(sql);
    });
  }, []);

  useEffect(() => {
    if (buf && sql) {
      (async () => {
        globalThis.SQL = sql;

        const dataSource = new DataSource({
          type: "sqljs",
          entities: [entity],
          database: new Uint8Array(buf),
        });

        await dataSource.initialize();

        setDatasource(dataSource);
      })();
    }
  }, [buf, entity, sql]);

  return (
    <PartsTab type={pathname.slice(1) as productType} dataSource={dataSource} />
  );
}
