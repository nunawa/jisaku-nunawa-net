import { Container, Title } from "@mantine/core";
import SelectedProduct from "./SelectedProduct";
import TotalPrice from "./TotalPrice";

export default function BuildTab() {
  let buildList = [];

  buildList.push(
    <div key="cpu">
      <Title size="lg">CPU</Title>
      <SelectedProduct id="cpu" />
    </div>,
  );
  buildList.push(
    <div key="memory">
      <Title size="lg">メモリ</Title>
      <SelectedProduct id="memory" />
    </div>,
  );
  buildList.push(
    <div key="motherboard">
      <Title size="lg">マザーボード</Title>
      <SelectedProduct id="motherboard" />
    </div>,
  );
  buildList.push(
    <div key="gpu">
      <Title size="lg">GPU</Title>
      <SelectedProduct id="gpu" />
    </div>,
  );
  buildList.push(
    <div key="ssd">
      <Title size="lg">SSD</Title>
      <SelectedProduct id="ssd" />
    </div>,
  );
  buildList.push(
    <div key="psu">
      <Title size="lg">電源</Title>
      <SelectedProduct id="psu" />
    </div>,
  );
  buildList.push(
    <div key="case">
      <Title size="lg">ケース</Title>
      <SelectedProduct id="case" />
    </div>,
  );

  buildList.push(
    <div key="total" className="mb-5">
      <Title size="lg">
        合計 <TotalPrice />
      </Title>
    </div>,
  );

  return <Container mt="sm">{buildList}</Container>;
}
