import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
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

export default function Home() {
  return (
    <>
      <Navbar className="mb-2" bg="light">
        <Container>
          <Navbar.Brand href="/">Brand link</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="cpu">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="cpu">CPU</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="memory">メモリ</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="motherboard">マザーボード</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="gpu">GPU</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ssd">SSD</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="cpu">
                  <InputGroup className="mb-3">
                    <Form.Control placeholder="キーワード" />
                    <Button variant="outline-secondary">クリア</Button>
                    <Button variant="outline-secondary">検索</Button>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">￥</InputGroup.Text>
                    <Form.Control placeholder="以上" />
                    <InputGroup.Text id="basic-addon1">～</InputGroup.Text>
                    <Form.Control placeholder="以下" />
                    <Button variant="outline-secondary">クリア</Button>
                    <Button variant="outline-secondary">検索</Button>
                  </InputGroup>
                  <Container
                    style={{ height: "70vh" }}
                    className="overflow-auto"
                  >
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}
