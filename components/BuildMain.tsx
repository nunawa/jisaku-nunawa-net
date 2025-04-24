import { Case } from "@/db/Case";
import { Cpu } from "@/db/Cpu";
import { Gpu } from "@/db/Gpu";
import { Memory } from "@/db/Memory";
import { Motherboard } from "@/db/Motherboard";
import { Psu } from "@/db/Psu";
import { Ssd } from "@/db/Ssd";
import { selectedProductsAtom } from "@/jotai/atom";
import { productType } from "@/types";
import pages from "@/utils/pages.json";
import { ActionIcon, Container, Group, Title } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useAtom } from "jotai";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BsCheckLg,
  BsLine,
  BsLink45Deg,
  BsReddit,
  BsThreads,
  BsTwitterX,
} from "react-icons/bs";
import { SiMisskey } from "react-icons/si";
import { TbBrandBluesky } from "react-icons/tb";
import "reflect-metadata";
import initSqlJs from "sql.js";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { DataSource } from "typeorm";
import { ProductCard } from "./ProductCard";
import TotalPrice from "./TotalPrice";

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

export default function BuildMain() {
  const buildList = [];
  const [selectedProducts, setSelectedProducts] = useAtom(selectedProductsAtom);
  const clipboard = useClipboard();
  const [sql, setSql] = useState<initSqlJs.SqlJsStatic>();
  const { buf } = useBuf();
  const [dataSource, setDatasource] = useState<DataSource>();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    initSqlJs({
      locateFile: () =>
        new URL("sql.js/dist/sql-wasm.wasm", import.meta.url).toString(),
    }).then((sql) => {
      setSql(sql);
    });
  }, []);

  useEffect(() => {
    if (!buf || !sql) {
      return;
    }

    globalThis.SQL = sql;

    (async () => {
      const dataSource = new DataSource({
        type: "sqljs",
        entities: [Cpu, Memory, Motherboard, Gpu, Ssd, Psu, Case],
        database: new Uint8Array(buf),
      });

      await dataSource.initialize();
      setDatasource(dataSource);
    })();
  }, [buf, sql]);

  useEffect(() => {
    if (!dataSource || searchParams.size === 0) {
      return;
    }

    const repositories = {
      cpu: Cpu,
      memory: Memory,
      motherboard: Motherboard,
      gpu: Gpu,
      ssd: Ssd,
      psu: Psu,
      case: Case,
    };

    (async () => {
      let newSelectedProducts = {
        cpu: null,
        memory: null,
        motherboard: null,
        gpu: null,
        ssd: null,
        psu: null,
        case: null,
      };

      for (const key of Object.keys(newSelectedProducts)) {
        const id = searchParams.get(key);
        if (!id) {
          continue;
        }

        const product = await dataSource.manager.findOneBy(
          repositories[key as productType],
          {
            id: id,
          },
        );

        if (!product) {
          continue;
        }

        newSelectedProducts = {
          ...newSelectedProducts,
          [key]: product,
        };
      }

      setSelectedProducts(newSelectedProducts);
      router.replace("/build");
    })();
  }, [dataSource, router, searchParams, setSelectedProducts]);

  const generateShareUrl = () => {
    const params = new URLSearchParams();

    for (const product of Object.entries(selectedProducts)) {
      if (product[1] === null) {
        continue;
      }

      params.append(product[0], product[1].id);
    }

    const paramString = params.toString();
    if (paramString === "") {
      return `${window.location.origin}/build`;
    }

    return `${window.location.origin}/build?${paramString}`;
  };

  for (const page of pages) {
    buildList.push(
      <div key={page.key}>
        <Title size="lg">{page.name}</Title>
        <ProductCard.Selected type={page.key as productType} />
      </div>,
    );
  }

  buildList.push(
    <div key="total">
      <Title size="lg">
        合計 <TotalPrice />
      </Title>
    </div>,
  );

  return (
    <>
      <Container mt="sm">{buildList}</Container>
      <Container mt="xl" mb="xl">
        <Title size="lg">構成をシェアする</Title>
        <Group mt="sm">
          <ActionIcon
            color={clipboard.copied ? "teal" : "blue"}
            variant="filled"
            size="lg"
            onClick={() => clipboard.copy(generateShareUrl())}
          >
            {clipboard.copied ? (
              <BsCheckLg style={{ width: "70%", height: "70%" }} />
            ) : (
              <BsLink45Deg style={{ width: "80%", height: "80%" }} />
            )}
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareUrl())}`}
            rel="noreferrer"
            target="_blank"
            variant="filled"
            color="#000000"
            size="lg"
          >
            <BsTwitterX style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`https://line.me/R/msg/text/?${encodeURIComponent(generateShareUrl())}`}
            rel="noreferrer"
            target="_blank"
            variant="filled"
            color="#06C755"
            size="lg"
          >
            <BsLine style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`https://bsky.app/intent/compose?text=${encodeURIComponent(generateShareUrl())}`}
            rel="noreferrer"
            target="_blank"
            variant="filled"
            color="#1185FE"
            size="lg"
          >
            <TbBrandBluesky style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`https://misskey.io/share?text=${encodeURIComponent(generateShareUrl())}`}
            rel="noreferrer"
            target="_blank"
            variant="filled"
            color="#86b300"
            size="lg"
          >
            <SiMisskey style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`https://www.threads.net/intent/post?text=${encodeURIComponent(generateShareUrl())}`}
            rel="noreferrer"
            target="_blank"
            variant="filled"
            color="#000000"
            size="lg"
          >
            <BsThreads style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(generateShareUrl())}`}
            rel="noreferrer"
            target="_blank"
            variant="filled"
            color="#FF4500"
            size="lg"
          >
            <BsReddit style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
        </Group>
      </Container>
    </>
  );
}
