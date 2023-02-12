import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useProducts() {
  const { data, error, isLoading } = useSWR(
    "/api/products?type=motherboard",
    fetcher
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
}

function Products() {
  const { products, isLoading } = useProducts();
  if (isLoading) {
    return (
      <Container>
        <Spinner className="mx-auto my-auto" animation="border" />
      </Container>
    );
  }

  console.log(products);

  let productList = [];

  for (const iterator of products) {
    productList.push(
      <Card className="mb-2">
        <Card.Header as="h5">
          <Stack direction="horizontal">
            <div className="me-auto">
              {iterator.manufacturer} {iterator.name}
            </div>
            <Button variant="primary">追加</Button>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Card.Title>￥{iterator.price.toLocaleString()}</Card.Title>
          <Card.Text style={{ wordBreak: "keep-all" }}>
            売れ筋:&nbsp;{iterator.sales_rank}位&emsp;フォームファクタ:&nbsp;
            {iterator.form_factor}&emsp;ソケット:&nbsp;{iterator.socket}
            &emsp;チップセット:&nbsp;
            {iterator.chipset}
            &emsp;メモリ:&nbsp;{iterator.memory}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return productList;
}

export default function Motherboard() {
  return (
    <>
      <InputGroup size="sm" className="mb-3">
        <Form.Select style={{ maxWidth: "100px" }}>
          <option value="1">売上順</option>
          <option value="2">価格順</option>
        </Form.Select>
        <Form.Control placeholder="キーワード" />
        <Button variant="outline-secondary">クリア</Button>
        <Button variant="outline-secondary">検索</Button>
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="basic-addon1">￥</InputGroup.Text>
        <Form.Control placeholder="以上" />
        <InputGroup.Text id="basic-addon1">～</InputGroup.Text>
        <Form.Control placeholder="以下" />
        <Button variant="outline-secondary">クリア</Button>
        <Button variant="outline-secondary">検索</Button>
      </InputGroup>
      <Container style={{ height: "70vh" }} className="overflow-auto">
        <Products />
      </Container>
    </>
  );
}
