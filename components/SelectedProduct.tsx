import { selectedProductsAtom } from "@/jotai/atom";
import classes from "@/styles/ProductCardLink.module.scss";
import { productType } from "@/types";
import { Box, Card, Group, Text } from "@mantine/core";
import { useAtomValue } from "jotai";
import Link from "next/link";
import ProductCardText from "./ProductCardText";

export default function SelectedProduct({ id }: { id: keyof productType }) {
  const selectedProducts = useAtomValue(selectedProductsAtom);
  const product = selectedProducts[id];

  if (product) {
    return (
      <Card withBorder shadow="sm" padding="sm" my="sm">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Box className={classes.boxSelected}>
              <Link
                href={"https://kakaku.com/item/" + product.id}
                rel="noreferrer"
                target="_blank"
                className={classes.link}
              >
                {product.manufacturer} {product.name}
              </Link>
            </Box>
            <Text c="dimmed">選択中</Text>
          </Group>
        </Card.Section>

        <Text mt="xs" size="lg" fw={500}>
          ￥{product.price.toLocaleString()}
        </Text>
        <ProductCardText type={id} product={product} />
      </Card>
    );
  } else {
    return (
      <Card withBorder shadow="sm" padding="sm" my="sm" h={131.8}>
        <Text my="auto" size="lg" c="dimmed" ta="center">
          未選択
        </Text>
      </Card>
    );
  }
}
