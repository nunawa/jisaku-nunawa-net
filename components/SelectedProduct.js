import { selectedProductsAtom } from "@/jotai/atom";
import styles from "@/styles/ProductCardLink.module.scss";
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
            <div className={"me-auto " + styles["div"]}>
              <Link
                href={"https://kakaku.com/item/" + product.id}
                className={styles["link"]}
              >
                {product.manufacturer} {product.name}
              </Link>
            </div>
            <div className={"text-muted ms-2 " + styles["status"]}>選択中</div>
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
