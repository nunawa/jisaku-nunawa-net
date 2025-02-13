import { selectedProductsAtom } from "@/jotai/atom";
import styles from "@/styles/ProductCardLink.module.scss";
import { productInfo, productType } from "@/types";
import { useAtom } from "jotai";
import Link from "next/link";
import { Button, Card, Container, Spinner, Stack } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import ProductCardText from "./ProductCardText";

export default function ProductList({
  id,
  products,
}: {
  id: keyof productType;
  products: productInfo[];
}) {
  const [selectedProducts, setSelectedProducts] = useAtom(selectedProductsAtom);
  let productList = [];

  if (products) {
    for (const iterator of products.slice(0, 30)) {
      productList.push(
        <Card key={iterator.id} className="mb-2">
          <Card.Header as="h5">
            <Stack direction="horizontal">
              <div className={"me-auto " + styles["div"]}>
                <Link
                  href={"https://kakaku.com/item/" + iterator.id}
                  className={styles["link"]}
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
                  // ここで無限ループ😇
                  setSelectedProducts(newSelectedProducts);
                }}
              >
                <BsPlusLg />
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>￥{iterator.price.toLocaleString()}</Card.Title>
            <ProductCardText type={id} product={iterator} />
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
