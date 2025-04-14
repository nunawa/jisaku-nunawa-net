import { selectedProductsAtom } from "@/jotai/atom";
import classes from "@/styles/ProductCard.module.scss";
import { productInfo, productType } from "@/types";
import { ActionIcon, Box, Card, Group, Text } from "@mantine/core";
import { useAtom } from "jotai";
import Link from "next/dist/client/link";
import { BsPlusLg, BsTrashFill } from "react-icons/bs";
import ProductCardText from "./ProductCardText";

function CommonCard({
  type,
  product,
  icon,
  action,
}: {
  type: productType;
  product: productInfo;
  icon: "plus" | "trash";
  action: () => void;
}) {
  let actionIcon;
  switch (icon) {
    case "plus":
      actionIcon = (
        <ActionIcon variant="filled" onClick={() => action()}>
          <BsPlusLg style={{ width: "70%", height: "70%" }} color="white" />
        </ActionIcon>
      );
      break;
    case "trash":
      actionIcon = (
        <ActionIcon variant="filled" color="red" onClick={() => action()}>
          <BsTrashFill style={{ width: "70%", height: "70%" }} color="white" />
        </ActionIcon>
      );
      break;
  }

  return (
    <Card withBorder shadow="sm" padding="sm" mb="sm" key={product.id}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Box className={classes.boxList}>
            <Link
              href={"https://kakaku.com/item/" + product.id}
              rel="noreferrer"
              target="_blank"
              className={classes.link}
            >
              {product.manufacturer} {product.name}
            </Link>
          </Box>
          {actionIcon}
        </Group>
      </Card.Section>

      <Text mt="xs" size="lg" fw={500}>
        ￥{product.price?.toLocaleString()}
      </Text>
      <ProductCardText type={type} product={product} />
    </Card>
  );
}

function ListElement({
  type,
  product,
}: {
  type: productType;
  product: productInfo;
}) {
  const [selectedProducts, setSelectedProducts] = useAtom(selectedProductsAtom);

  return (
    <CommonCard
      type={type}
      product={product}
      icon="plus"
      action={() => {
        const newSelectedProducts = {
          ...selectedProducts,
          [type]: product,
        };
        setSelectedProducts(newSelectedProducts);
      }}
    />
  );
}

function Selected({ type }: { type: productType }) {
  const [selectedProducts, setSelectedProducts] = useAtom(selectedProductsAtom);
  const selectedProduct = selectedProducts[type];

  if (!selectedProduct) {
    return (
      <Card withBorder shadow="sm" padding="sm" my="sm" h={131.8}>
        <Text my="auto" size="lg" c="dimmed" ta="center">
          未選択
        </Text>
      </Card>
    );
  }

  return (
    <Box mt="sm">
      <CommonCard
        type={type}
        product={selectedProduct}
        icon="trash"
        action={() => {
          const newSelectedProducts = { ...selectedProducts, [type]: null };
          setSelectedProducts(newSelectedProducts);
        }}
      />
    </Box>
  );
}

export const ProductCard = {
  ListElement: ListElement,
  Selected: Selected,
};
