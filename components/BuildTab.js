import { Container } from "react-bootstrap";
import SelectedProduct from "./SelectedProduct";
import TotalPrice from "./TotalPrice";

export default function BuildTab() {
  let buildList = [];

  buildList.push(<SelectedProduct id="cpu" />);
  buildList.push(<SelectedProduct id="memory" />);
  buildList.push(<SelectedProduct id="motherboard" />);
  buildList.push(<SelectedProduct id="gpu" />);
  buildList.push(<SelectedProduct id="ssd" />);

  buildList.push(
    <Container key="total" className="mb-5">
      <h5>
        合計 <TotalPrice />
      </h5>
    </Container>,
  );

  return buildList;
}
