/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

export default function SelectedProduct({ id, product }) {
  if (product) {
    let text;
    if (id == "cpu") {
      text = (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          売れ筋:&nbsp;{product.sales_rank}位&emsp;クロック:&nbsp;
          {product.frequency}GHz&emsp;ソケット:&nbsp;{product.socket}
          &emsp;コア:&nbsp;
          {product.core_count}
          &emsp;スレッド:&nbsp;{product.thread_count}
        </Card.Text>
      );
    } else if (id == "memory") {
      text = (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          売れ筋:&nbsp;{product.sales_rank}位&emsp;容量:&nbsp;
          {product.capacity}&emsp;枚数:&nbsp;{product.pcs}
          &emsp;規格:&nbsp;
          {product.standard}
          &emsp;インターフェース:&nbsp;{product.interface}
        </Card.Text>
      );
    } else if (id == "motherboard") {
      text = (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          売れ筋:&nbsp;{product.sales_rank}位&emsp;フォームファクタ:&nbsp;
          {product.form_factor}&emsp;ソケット:&nbsp;{product.socket}
          &emsp;チップセット:&nbsp;
          {product.chipset}
          &emsp;メモリ:&nbsp;{product.memory}
        </Card.Text>
      );
    } else if (id == "gpu") {
      const monitor = product.monitor.join(" ");
      text = (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          売れ筋:&nbsp;{product.sales_rank}
          位&emsp;バスインターフェース:&nbsp;
          {product.bus_interface}&emsp;メモリ:&nbsp;{product.memory}
          &emsp;モニター端子:&nbsp;
          {monitor}
        </Card.Text>
      );
    } else if (id == "ssd") {
      text = (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          売れ筋:&nbsp;{product.sales_rank}位&emsp;容量:&nbsp;
          {product.capacity}&emsp;タイプ:&nbsp;{product.cell_type}
          &emsp;サイズ:&nbsp;
          {product.size}
          &emsp;インターフェース:&nbsp;{product.interface}
        </Card.Text>
      );
    }

    return (
      <Card className="mb-3">
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
                href={"https://kakaku.com/item/" + product.id}
                css={css({
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                })}
              >
                {product.manufacturer} {product.name}
              </Link>
            </div>
            <div
              className="text-muted ms-2"
              css={css({ fontWeight: "normal", wordBreak: "keep-all" })}
            >
              選択中
            </div>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Card.Title>￥{product.price.toLocaleString()}</Card.Title>
          {text}
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card className="mb-3">
        <Card.Body>
          <Card.Text
            className="text-muted"
            style={{ wordBreak: "keep-all", textAlign: "center" }}
          >
            未選択
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
