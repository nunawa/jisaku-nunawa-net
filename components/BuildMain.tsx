import { productType } from "@/types";
import pages from "@/utils/pages.json";
import { Container, Title } from "@mantine/core";
import CompatibilityWarnings from "./CompatibilityWarnings";
import { ProductCard } from "./ProductCard";
import TotalPrice from "./TotalPrice";

export default function BuildMain() {
  const buildList = [];

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
    <Container mt="sm" mb="xl">
      <CompatibilityWarnings />
      {buildList}
    </Container>
  );
}
