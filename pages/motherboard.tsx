import PartsTab from "@/components/PartsTab";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import TotalPrice from "@/components/TotalPrice";
import { Motherboard as MotherboardEntity } from "@/db/Motherboard";
import pages from "@/utils/pages.json";
import { Anchor, AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import "reflect-metadata";
import initSqlJs from "sql.js";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { DataSource } from "typeorm";

const fetcher: Fetcher<ArrayBuffer, string> = (url) =>
  fetch(url).then((res) => res.arrayBuffer());

function useBuf() {
  let { data } = useSWRImmutable(
    "https://bucket.nunawa.net/parts_latest.db",
    fetcher,
  );

  return {
    buf: data,
  };
}

const pageList = pages;

export default function Motherboard() {
  const { buf } = useBuf();
  const [sql, setSql] = useState<initSqlJs.SqlJsStatic>();
  const [dataSource, setDatasource] = useState<DataSource>();
  const [opened, { toggle }] = useDisclosure();

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
        // @ts-ignore
        globalThis.SQL = sql;

        const dataSource = new DataSource({
          type: "sqljs",
          entities: [MotherboardEntity],
          database: new Uint8Array(buf),
        });

        await dataSource.initialize();

        setDatasource(dataSource);
      })();
    }
  }, [buf, sql]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Anchor
              fw={500}
              fz="xl"
              underline="never"
              inherit={true}
              style={{ color: "var(--mantine-color-text)" }}
              component={Link}
              href="/"
            >
              jisaku.nunawa.net
            </Anchor>
          </Group>
          <ThemeDropdown />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {pageList.map((x) => {
          if (x.key === "motherboard") {
            return <NavLink key={x.key} label={x.name} active />;
          } else {
            return (
              <NavLink
                key={x.key}
                label={x.name}
                component={Link}
                href={`/${x.key}`}
              />
            );
          }
        })}
        <NavLink
          key="build"
          label={<TotalPrice />}
          component={Link}
          href="/build"
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <PartsTab type="motherboard" dataSource={dataSource} />
      </AppShell.Main>
    </AppShell>
  );
}
