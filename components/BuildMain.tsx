import { selectedProductsAtom } from "@/jotai/atom";
import { productType } from "@/types";
import pages from "@/utils/pages.json";
import { ActionIcon, Container, Group, Title } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useAtom } from "jotai";
import Link from "next/link";
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
import { ProductCard } from "./ProductCard";
import TotalPrice from "./TotalPrice";

export default function BuildMain() {
  const buildList = [];
  const [selectedProducts] = useAtom(selectedProductsAtom);
  const clipboard = useClipboard();

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
