import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import FilterOption from "./FilterOption";
import ProductList from "./ProductList";
import SelectedProduct from "./SelectedProduct";

export default function PartsTab({
  type,
  selectedProducts,
  setSelected,
  buf,
  sql,
}) {
  const [originProducts, setOriginProducts] = useState();
  const [convertedProducts, setConvertedProducts] = useState();

  useEffect(() => {
    if (buf && sql) {
      const db = new sql.Database(new Uint8Array(buf));
      let productList = [];
      db.each(`SELECT * FROM ${type} LIMIT 30`, (row) => {
        productList.push(row);
      });
      console.log(productList);
      setOriginProducts(productList);
      setConvertedProducts(productList);
    }
  }, [buf, sql, type]);

  const [submittedFilterOption, setSubmittedFilterOption] = useState({
    sort: "sales_rank_asc",
    keyword: "",
    min: "",
    max: "",
  });

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <SelectedProduct id={type} product={selectedProducts[type]} />
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
        <ProductList
          id={type}
          products={convertedProducts}
          selectedProducts={selectedProducts}
          setSelected={setSelected}
        />
      </Container>
    </>
  );
}
