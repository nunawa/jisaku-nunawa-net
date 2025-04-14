import { Container, Title } from "@mantine/core";
import SelectedProduct from "./SelectedProduct";
import TotalPrice from "./TotalPrice";
import pages from "@/utils/pages.json";
import { productType } from "@/types";

export default function BuildMain() {
  const buildList = [];

  for (const page of pages) {
    buildList.push(
      <div key={page.key}>
        <Title size="lg">{page.name}</Title>
        <SelectedProduct id={page.key as productType} />
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
      {buildList}
    </Container>
  );
}
