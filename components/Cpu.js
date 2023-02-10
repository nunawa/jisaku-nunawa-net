import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Tab from "react-bootstrap/Tab";

function Product() {
  return (
    <Card className="mb-2">
      <Card.Header as="h5">
        <Stack direction="horizontal">
          <div className="me-auto">Intel XX-XXXXX</div>
          <Button variant="primary">追加</Button>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default function Cpu() {
  return (
    <Tab.Pane eventKey="cpu">
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
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Container>
    </Tab.Pane>
  );
}
