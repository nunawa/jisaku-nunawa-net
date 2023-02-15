import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";
import { useState, useEffect, useRef } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useProducts() {
  const { data, error, isLoading } = useSWR("/api/products?type=ssd", fetcher);

  return {
    products: data,
    isLoading,
    isError: error,
  };
}

function Products({ products, selectedProducts, setSelected }) {
  let productList = [];
  console.log(products);

  if (products) {
    for (const iterator of products.slice(0, 30)) {
      productList.push(
        <Card className="mb-2">
          <Card.Header as="h5">
            <Stack direction="horizontal">
              <div className="me-auto">
                {iterator.manufacturer} {iterator.name}
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  let newSelectedProducts = Object.assign({}, selectedProducts);
                  newSelectedProducts.ssd = iterator;
                  setSelected(newSelectedProducts);
                }}
              >
                追加
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>￥{iterator.price.toLocaleString()}</Card.Title>
            <Card.Text style={{ wordBreak: "keep-all" }}>
              売れ筋:&nbsp;{iterator.sales_rank}位&emsp;容量:&nbsp;
              {iterator.capacity}&emsp;タイプ:&nbsp;{iterator.cell_type}
              &emsp;サイズ:&nbsp;
              {iterator.size}
              &emsp;インターフェース:&nbsp;{iterator.interface}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }

    return productList;
  } else {
    return (
      <Container style={{ textAlign: "center" }}>
        <Spinner animation="border" />
      </Container>
    );
  }
}

function SelectedProduct({ product }) {
  if (product) {
    return (
      <Card className="mb-3">
        <Card.Header as="h5">
          <Stack direction="horizontal">
            <div className="me-auto">
              {product.manufacturer} {product.name}
            </div>
            <div className="text-muted">選択中</div>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Card.Title>￥{product.price.toLocaleString()}</Card.Title>
          <Card.Text style={{ wordBreak: "keep-all" }}>
            売れ筋:&nbsp;{product.sales_rank}位&emsp;容量:&nbsp;
            {product.capacity}&emsp;タイプ:&nbsp;{product.cell_type}
            &emsp;サイズ:&nbsp;
            {product.size}
            &emsp;インターフェース:&nbsp;{product.interface}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card className="mb-3">
        <Card.Body>
          <Card.Text
            className="text-muted"
            style={{ wordBreak: "keep-all", textAlign: "center" }}
          >
            未選択
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
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
      <SelectedProduct product={selectedProducts.ssd} />
      <InputGroup size="sm" className="mb-3">
        <Form.Select
          style={{ maxWidth: "100px" }}
          ref={sort}
          onChange={() => handleSearch()}
        >
          <option value="sales_rank_asc" selected>
            売上順
          </option>
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
          products={convertedProducts}
          selectedProducts={selectedProducts}
          setSelected={setSelected}
        />
      </Container>
    </>
  );
}
