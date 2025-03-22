import classes from "@/styles/PartsTab.module.scss";
import { productInfo, productType } from "@/types";
import { Button, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { DataSource } from "typeorm";
import FilterOption from "./FilterOption";
import ProductList from "./ProductList";
import SelectedProduct from "./SelectedProduct";

export default function PartsTab({
  type,
  dataSource,
}: {
  type: keyof productType;
  dataSource: DataSource | undefined;
}) {
  const [originProducts, setOriginProducts] = useState<productInfo[]>();
  const [convertedProducts, setConvertedProducts] = useState<productInfo[]>();

  useEffect(() => {
    if (dataSource) {
      (async () => {
        let productList: productInfo[] = [];

        productList = (await dataSource.manager.query(
          `SELECT * FROM "${type}" LIMIT 30`,
        )) as productInfo[];

        setOriginProducts(productList);
        setConvertedProducts(productList);
      })();
    }
  }, [dataSource, type]);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <SelectedProduct id={type} />
      <Button variant="default" fullWidth mb="sm" onClick={open}>
        オプション
      </Button>
      <FilterOption
        opened={opened}
        close={close}
        type={type}
        dataSource={dataSource}
        setConvertedProducts={setConvertedProducts}
      />
      <div className={classes.list}>
        <ProductList id={type} products={convertedProducts!} />
      </div>
    </Container>
  );
}
