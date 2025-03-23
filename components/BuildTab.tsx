import { Container } from "react-bootstrap";
import SelectedProduct from "./SelectedProduct";
import TotalPrice from "./TotalPrice";

export default function BuildTab() {
  let buildList = [];

  buildList.push(
    <Container key="cpu">
      <h5>CPU</h5>
      <SelectedProduct id="cpu" />
    </Container>,
  );
  buildList.push(
    <Container key="memory">
      <h5>メモリ</h5>
      <SelectedProduct id="memory" />
    </Container>,
  );
  buildList.push(
    <Container key="motherboard">
      <h5>マザーボード</h5>
      <SelectedProduct id="motherboard" />
    </Container>,
  );
  buildList.push(
    <Container key="gpu">
      <h5>GPU</h5>
      <SelectedProduct id="gpu" />
    </Container>,
  );
  buildList.push(
    <Container key="ssd">
      <h5>SSD</h5>
      <SelectedProduct id="ssd" />
    </Container>,
  );
  buildList.push(
    <Container key="psu">
      <h5>電源</h5>
      <SelectedProduct id="psu" />
    </Container>,
  );
  buildList.push(
    <Container key="case">
      <h5>ケース</h5>
      <SelectedProduct id="case" />
    </Container>,
  );

  buildList.push(
    <Container key="total" className="mb-5">
      <h5>
        合計 <TotalPrice />
      </h5>
    </Container>,
  );

  return buildList;
}
