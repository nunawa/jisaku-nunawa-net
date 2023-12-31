/** @jsxImportSource @emotion/react */
import { selectedProductsAtom } from "@/jotai/atom";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { Card, Stack } from "react-bootstrap";
import ProductCardText from "./ProductCardText";

export default function SelectedProduct({ id }) {
  const selectedProducts = useAtomValue(selectedProductsAtom);
  const product = selectedProducts[id];

  if (product) {
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
          <ProductCardText type={id} product={product} />
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
