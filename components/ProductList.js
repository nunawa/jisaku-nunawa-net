/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import { BsPlusLg } from "react-icons/bs";

export default function ProductList({
  id,
  products,
  selectedProducts,
  setSelected,
}) {
  let productList = [];

  if (products) {
    for (const iterator of products.slice(0, 30)) {
      let text;
      if (id == "cpu") {
        text = (
          <Card.Text style={{ wordBreak: "keep-all" }}>
            売れ筋:&nbsp;{iterator.sales_rank}位&emsp;クロック:&nbsp;
            {iterator.frequency}GHz&emsp;ソケット:&nbsp;{iterator.socket}
            &emsp;コア:&nbsp;
            {iterator.core_count}
            &emsp;スレッド:&nbsp;{iterator.thread_count}
          </Card.Text>
        );
      } else if (id == "memory") {
        text = (
          <Card.Text style={{ wordBreak: "keep-all" }}>
            売れ筋:&nbsp;{iterator.sales_rank}位&emsp;容量:&nbsp;
            {iterator.capacity}&emsp;枚数:&nbsp;{iterator.pcs}
            &emsp;規格:&nbsp;
            {iterator.standard}
            &emsp;インターフェース:&nbsp;{iterator.interface}
          </Card.Text>
        );
      } else if (id == "motherboard") {
        text = (
          <Card.Text style={{ wordBreak: "keep-all" }}>
            売れ筋:&nbsp;{iterator.sales_rank}位&emsp;フォームファクタ:&nbsp;
            {iterator.form_factor}&emsp;ソケット:&nbsp;{iterator.socket}
            &emsp;チップセット:&nbsp;
            {iterator.chipset}
            &emsp;メモリ:&nbsp;{iterator.memory}
          </Card.Text>
        );
      } else if (id == "gpu") {
        text = (
          <Card.Text style={{ wordBreak: "keep-all" }}>
            売れ筋:&nbsp;{iterator.sales_rank}
            位&emsp;バスインターフェース:&nbsp;
            {iterator.bus_interface}&emsp;メモリ:&nbsp;{iterator.memory}
            &emsp;モニター端子:&nbsp;
            {iterator.monitor}
          </Card.Text>
        );
      } else if (id == "ssd") {
        text = (
          <Card.Text style={{ wordBreak: "keep-all" }}>
            売れ筋:&nbsp;{iterator.sales_rank}位&emsp;容量:&nbsp;
            {iterator.capacity}&emsp;タイプ:&nbsp;{iterator.cell_type}
            &emsp;サイズ:&nbsp;
            {iterator.size}
            &emsp;インターフェース:&nbsp;{iterator.interface}
          </Card.Text>
        );
      }

      productList.push(
        <Card className="mb-2">
          <Card.Header as="h5">
            <Stack direction="horizontal">
              <div
                className="me-auto"
                css={css({
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: "700px",
                  textOverflow: "ellipsis",
                })}
              >
                <Link
                  href={"https://kakaku.com/item/" + iterator.id}
                  css={css({
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  })}
                >
                  {iterator.manufacturer} {iterator.name}
                </Link>
              </div>
              <Button
                variant="primary"
                className="ms-2"
                onClick={() => {
                  let newSelectedProducts = Object.assign({}, selectedProducts);
                  newSelectedProducts[id] = iterator;
                  setSelected(newSelectedProducts);
                }}
              >
                <BsPlusLg />
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>￥{iterator.price.toLocaleString()}</Card.Title>
            {text}
          </Card.Body>
        </Card>,
      );
    }

    return productList;
  } else {
    return (
      <Container style={{ textAlign: "center" }}>
        <Spinner animation="border" />
      </Container>
    );
  }
}
