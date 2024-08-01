import { filterOptions, productInfo, productType } from "@/types";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import initSqlJs from "sql.js";
import FilterOption from "./FilterOption";
import ProductList from "./ProductList";
import SelectedProduct from "./SelectedProduct";

export default function PartsTab({
  type,
  buf,
  sql,
}: {
  type: keyof productType;
  buf: ArrayBuffer;
  sql: initSqlJs.SqlJsStatic;
}) {
  const [originProducts, setOriginProducts] = useState<productInfo[]>();
  const [convertedProducts, setConvertedProducts] = useState<productInfo[]>();

  useEffect(() => {
    if (buf && sql) {
      const db = new sql.Database(new Uint8Array(buf));
      let productList: productInfo[] = [];
      db.each(
        `SELECT * FROM ${type} LIMIT 30`,
        (row) => {
          productList.push(row as productInfo);
        },
        () => {},
      );
      console.log(productList);
      setOriginProducts(productList);
      setConvertedProducts(productList);
    }
  }, [buf, sql, type]);

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
        buf={buf}
        sql={sql}
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
