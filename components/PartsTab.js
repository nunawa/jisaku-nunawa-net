import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import FilterOption from "./FilterOption";
import ProductList from "./ProductList";
import SelectedProduct from "./SelectedProduct";

export default function PartsTab({ type, selectedProducts, setSelected, db }) {
  useEffect(() => {
    window
      .initSqlJs({
        locateFile: (file) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
      })
      .then((sql) => {
        if (db) {
          const dbf = new sql.Database(new Uint8Array(db));
          let productList = [];
          dbf.each(`SELECT * FROM ${type} LIMIT 30`, (row) => {
            productList.push(row);
          });
          console.log(productList);
          setOriginProducts(productList);
          setConvertedProducts(productList);
        }
      });
  }, [type, db]);

  const [originProducts, setOriginProducts] = useState();
  const [convertedProducts, setConvertedProducts] = useState();

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
        db={db}
        setConvertedProducts={setConvertedProducts}
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
