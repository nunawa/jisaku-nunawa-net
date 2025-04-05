import { selectedProductsAtom } from "@/jotai/atom";
import classes from "@/styles/ProductCardLink.module.scss";
import { productInfo, productType } from "@/types";
import {
  ActionIcon,
  Box,
  Card,
  Container,
  Group,
  Loader,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import Link from "next/link";
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
        <Card withBorder shadow="sm" padding="sm" mb="sm" key={iterator.id}>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Box className={classes.boxList}>
                <Link
                  href={"https://kakaku.com/item/" + iterator.id}
                  rel="noreferrer"
                  target="_blank"
                  className={classes.link}
                >
                  {iterator.manufacturer} {iterator.name}
                </Link>
              </Box>
              <ActionIcon
                variant="filled"
                onClick={() => {
                  const newSelectedProducts = {
                    ...selectedProducts,
                    [id]: iterator,
                  };
                  setSelectedProducts(newSelectedProducts);
                }}
              >
                <BsPlusLg
                  style={{ width: "70%", height: "70%" }}
                  color="white"
                />
              </ActionIcon>
            </Group>
          </Card.Section>

          <Text mt="xs" size="lg" fw={500}>
            ￥{iterator.price.toLocaleString()}
          </Text>
          <ProductCardText type={id} product={iterator} />
        </Card>,
      );
    }

    return productList;
  } else {
    return (
      <Container pt="sm" ta="center">
        <Loader color="blue" />
      </Container>
    );
  }
}
