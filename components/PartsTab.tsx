import classes from "@/styles/PartsTab.module.scss";
import { filterOptions, productInfo, productType } from "@/types";
import { Button, Container } from "@mantine/core";
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

  const [submittedFilterOption, setSubmittedFilterOption] =
    useState<filterOptions>({
      sort: "sales_rank_asc",
      keyword: "",
      min: "",
      max: "",
      cpu: undefined,
      memory: undefined,
      motherboard: undefined,
      gpu: undefined,
      ssd: undefined,
      psu: undefined,
      case: undefined,
    });

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Container>
      <SelectedProduct id={type} />
      <Button variant="default" fullWidth mb="sm" onClick={() => handleShow()}>
        オプション
      </Button>
      <FilterOption
        show={show}
        handleClose={() => handleClose()}
        type={type}
        dataSource={dataSource}
        setConvertedProducts={setConvertedProducts}
        submittedFilterOption={submittedFilterOption}
        setSubmittedFilterOption={setSubmittedFilterOption}
      />
      <div className={classes.list}>
        <ProductList id={type} products={convertedProducts!} />
      </div>
    </Container>
  );
}
