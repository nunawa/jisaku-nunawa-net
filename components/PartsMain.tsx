"use client";

import classes from "@/styles/PartsMain.module.scss";
import { productInfo, productType } from "@/types";
import { Button, Container, Flex, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import "reflect-metadata";
import initSqlJs from "sql.js";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { DataSource } from "typeorm";
import FilterOption from "./FilterOption";
import { ProductCard } from "./ProductCard";

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

function ProductList({
  type,
  products,
}: {
  type: productType;
  products: productInfo[] | undefined;
}) {
  if (!products) {
    return (
      <Container pt="sm" ta="center">
        <Loader color="blue" />
      </Container>
    );
  }

  const productCardList = [];
  for (const product of products.slice(0, 30)) {
    productCardList.push(
      <ProductCard.ListElement
        key={product.id}
        type={type}
        product={product}
      />,
    );
  }

  return productCardList;
}

export default function PartsMain({
  type,
  entity,
}: {
  type: productType;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  entity: Function;
}) {
  const [sql, setSql] = useState<initSqlJs.SqlJsStatic>();
  const { buf } = useBuf();
  const [dataSource, setDatasource] = useState<DataSource>();
  const [convertedProducts, setConvertedProducts] = useState<productInfo[]>();

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

        const productList = (await dataSource.manager.query(
          `SELECT * FROM "${type}" LIMIT 30`,
        )) as productInfo[];

        setConvertedProducts(productList);
      })();
    }
  }, [buf, sql, entity, type]);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <Flex direction="column" h="calc(100vh - var(--app-shell-header-height))">
        <div>
          <ProductCard.Selected type={type} />
          <Button variant="default" fullWidth mb="sm" onClick={open}>
            オプション
          </Button>
          <FilterOption
            opened={opened}
            close={close}
            type={type}
            dataSource={dataSource}
            setConvertedProducts={setConvertedProducts}
          />
        </div>
        <div className={classes.list}>
          <ProductList type={type} products={convertedProducts} />
        </div>
      </Flex>
    </Container>
  );
}
