import { filterOptions, productInfo, productType } from "@/types";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
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
          `SELECT * FROM ${type} LIMIT 30`,
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
      ssd: undefined,
      gpu: undefined,
      motherboard: undefined,
      memory: undefined,
      cpu: undefined,
    });

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <SelectedProduct id={type} />
      <div className="d-grid gap-2 mb-3">
        <Button variant="secondary" onClick={() => handleShow()}>
          オプション
        </Button>
      </div>
      <FilterOption
        show={show}
        handleClose={() => handleClose()}
        type={type}
        dataSource={dataSource}
        setConvertedProducts={setConvertedProducts}
        submittedFilterOption={submittedFilterOption}
        setSubmittedFilterOption={setSubmittedFilterOption}
      />
      <Container style={{ height: "70vh" }} className="overflow-auto">
        <ProductList id={type} products={convertedProducts!} />
      </Container>
    </>
  );
}
