import { selectedProductsAtom, totalPriceAtom } from "@/jotai/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { Container } from "react-bootstrap";
import SelectedProduct from "./SelectedProduct";

export default function BuildTab() {
  const selectedProducts = useAtomValue(selectedProductsAtom);
  const setTotalPrice = useSetAtom(totalPriceAtom);
  let buildList = [];

  buildList.push(<SelectedProduct id="cpu" />);
  buildList.push(<SelectedProduct id="memory" />);
  buildList.push(<SelectedProduct id="motherboard" />);
  buildList.push(<SelectedProduct id="gpu" />);
  buildList.push(<SelectedProduct id="ssd" />);

  const selectedProductsValues = Object.values(selectedProducts);
  const total = selectedProductsValues.reduce(
    (acc, cur) => (cur === null ? acc : cur.price + acc),
    0,
  );
  buildList.push(
    <Container key="total" className="mb-5">
      <h5>合計 ￥{total.toLocaleString()}</h5>
    </Container>,
  );
  setTotalPrice(total);

  return buildList;
}
