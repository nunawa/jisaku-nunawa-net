import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useSWR from "swr";
import Products from "./Products";
import SelectedProduct from "./SelectedProduct";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useProducts() {
  let { data, error, isLoading } = useSWR("/api/products?type=ssd", fetcher);
  if (data) data = data.Documents;

  return {
    products: data,
    isLoading,
    isError: error,
  };
}

export default function Ssd({ selectedProducts, setSelected }) {
  const { products } = useProducts();
  const [convertedProducts, setProducts] = useState();

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const sort = useRef();

  const keyword = useRef();

  const max = useRef();
  const min = useRef();

  function handleSearch() {
    let filteredProducts = products;

    if (sort.current.value == "sales_rank_asc") {
      filteredProducts = filteredProducts.slice().sort((a, b) => {
        if (a.sales_rank === b.sales_rank) return 0;
        if (a.sales_rank === null) return 1;
        if (b.sales_rank === null) return -1;
        return a.sales_rank < b.sales_rank ? -1 : 1;
      });
    } else if (sort.current.value == "price_asc") {
      filteredProducts = filteredProducts
        .slice()
        .sort((a, b) => a.price - b.price);
    }

    if (keyword.current.value) {
      filteredProducts = filteredProducts.filter((e) => {
        const name = e.manufacturer + " " + e.name;
        return name.indexOf(keyword.current.value) != -1;
      });
    }

    const maxNum = Number(max.current.value);
    const minNum = Number(min.current.value);
    if (maxNum && minNum) {
      filteredProducts = filteredProducts.filter(
        (e) => e.price >= minNum && e.price <= maxNum
      );
    } else if (maxNum) {
      filteredProducts = filteredProducts.filter((e) => e.price <= maxNum);
    } else if (minNum) {
      filteredProducts = filteredProducts.filter((e) => e.price >= minNum);
    }

    setProducts(filteredProducts);
  }

  return (
    <>
      <SelectedProduct id="ssd" product={selectedProducts.ssd} />
      <InputGroup size="sm" className="mb-3">
        <Form.Select
          style={{ maxWidth: "100px" }}
          defaultValue="sales_rank_asc"
          ref={sort}
          onChange={() => handleSearch()}
        >
          <option value="sales_rank_asc">売上順</option>
          <option value="price_asc">価格順</option>
        </Form.Select>
        <Form.Control ref={keyword} placeholder="キーワード" />
        <Button
          variant="outline-secondary"
          onClick={() => {
            keyword.current.value = "";
            handleSearch();
          }}
        >
          クリア
        </Button>
        <Button variant="outline-secondary" onClick={() => handleSearch()}>
          検索
        </Button>
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text>￥</InputGroup.Text>
        <Form.Control ref={min} type="number" placeholder="以上" />
        <InputGroup.Text>～</InputGroup.Text>
        <Form.Control ref={max} type="number" placeholder="以下" />
        <Button
          variant="outline-secondary"
          onClick={() => {
            min.current.value = "";
            max.current.value = "";
            handleSearch();
          }}
        >
          クリア
        </Button>
        <Button variant="outline-secondary" onClick={() => handleSearch()}>
          検索
        </Button>
      </InputGroup>
      <Container style={{ height: "70vh" }} className="overflow-auto">
        <Products
          id="ssd"
          products={convertedProducts}
          selectedProducts={selectedProducts}
          setSelected={setSelected}
        />
      </Container>
    </>
  );
}
