import Cpu from "@/components/Cpu";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Memory from "@/components/Memory";
import Motherboard from "@/components/Motherboard";
import Gpu from "@/components/Gpu";
import Ssd from "@/components/Ssd";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";

function Build({ selectedProducts, setTotal }) {
  console.log(selectedProducts);
  let buildList = [];

  if (selectedProducts.cpu) {
    buildList.push(
      <Container>
        <h5>CPU</h5>
        <Card className="mb-3">
          <Card.Header as="h5">
            <Stack direction="horizontal">
              <div className="me-auto">
                {selectedProducts.cpu.manufacturer} {selectedProducts.cpu.name}
              </div>
              <div className="text-muted">選択中</div>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              ￥{selectedProducts.cpu.price.toLocaleString()}
            </Card.Title>
            <Card.Text style={{ wordBreak: "keep-all" }}>
              売れ筋:&nbsp;{selectedProducts.cpu.sales_rank}
              位&emsp;クロック:&nbsp;
              {selectedProducts.cpu.frequency}GHz&emsp;ソケット:&nbsp;
              {selectedProducts.cpu.socket}
              &emsp;コア:&nbsp;
              {selectedProducts.cpu.core_count}
              &emsp;スレッド:&nbsp;{selectedProducts.cpu.thread_count}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    buildList.push(
      <Container>
        <h5>CPU</h5>未選択
      </Container>
    );
  }

  if (selectedProducts.memory) {
    buildList.push(
      <Container>
        <h5>メモリ</h5>
        <Card className="mb-3">
          <Card.Header as="h5">
            <Stack direction="horizontal">
              <div className="me-auto">
                {selectedProducts.memory.manufacturer}{" "}
                {selectedProducts.memory.name}
              </div>
              <div className="text-muted">選択中</div>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              ￥{selectedProducts.memory.price.toLocaleString()}
            </Card.Title>
            <Card.Text style={{ wordBreak: "keep-all" }}>
              売れ筋:&nbsp;{selectedProducts.memory.sales_rank}
              位&emsp;容量:&nbsp;
              {selectedProducts.memory.capacity}&emsp;枚数:&nbsp;
              {selectedProducts.memory.pcs}
              &emsp;規格:&nbsp;
              {selectedProducts.memory.standard}
              &emsp;インターフェース:&nbsp;{selectedProducts.memory.interface}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    buildList.push(
      <Container>
        <h5>メモリ</h5>未選択
      </Container>
    );
  }

  if (selectedProducts.motherboard) {
    buildList.push(
      <Container>
        <h5>マザーボード</h5>
        <Card className="mb-3">
          <Card.Header as="h5">
            <Stack direction="horizontal">
              <div className="me-auto">
                {selectedProducts.motherboard.manufacturer}{" "}
                {selectedProducts.motherboard.name}
              </div>
              <div className="text-muted">選択中</div>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              ￥{selectedProducts.motherboard.price.toLocaleString()}
            </Card.Title>
            <Card.Text style={{ wordBreak: "keep-all" }}>
              売れ筋:&nbsp;{selectedProducts.motherboard.sales_rank}
              位&emsp;フォームファクタ:&nbsp;
              {selectedProducts.motherboard.form_factor}&emsp;ソケット:&nbsp;
              {selectedProducts.motherboard.socket}
              &emsp;チップセット:&nbsp;
              {selectedProducts.motherboard.chipset}
              &emsp;メモリ:&nbsp;{selectedProducts.motherboard.memory}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    buildList.push(
      <Container>
        <h5>マザーボード</h5>未選択
      </Container>
    );
  }

  if (selectedProducts.gpu) {
    let monitor = "";
    if (selectedProducts.gpu.monitor) {
      monitor = selectedProducts.gpu.monitor.join(" ");
    }

    buildList.push(
      <Container>
        <h5>GPU</h5>
        <Card className="mb-3">
          <Card.Header as="h5">
            <Stack direction="horizontal">
              <div className="me-auto">
                {selectedProducts.gpu.manufacturer} {selectedProducts.gpu.name}
              </div>
              <div className="text-muted">選択中</div>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              ￥{selectedProducts.gpu.price.toLocaleString()}
            </Card.Title>
            <Card.Text style={{ wordBreak: "keep-all" }}>
              売れ筋:&nbsp;{selectedProducts.gpu.sales_rank}
              位&emsp;バスインターフェース:&nbsp;
              {selectedProducts.gpu.bus_interface}&emsp;メモリ:&nbsp;
              {selectedProducts.gpu.memory}
              &emsp;モニター端子:&nbsp;
              {monitor}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    buildList.push(
      <Container>
        <h5>GPU</h5>未選択
      </Container>
    );
  }

  if (selectedProducts.ssd) {
    buildList.push(
      <Container>
        <h5>SSD</h5>
        <Card className="mb-3">
          <Card.Header as="h5">
            <Stack direction="horizontal">
              <div className="me-auto">
                {selectedProducts.ssd.manufacturer} {selectedProducts.ssd.name}
              </div>
              <div className="text-muted">選択中</div>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              ￥{selectedProducts.ssd.price.toLocaleString()}
            </Card.Title>
            <Card.Text style={{ wordBreak: "keep-all" }}>
              売れ筋:&nbsp;{selectedProducts.ssd.sales_rank}位&emsp;容量:&nbsp;
              {selectedProducts.ssd.capacity}&emsp;タイプ:&nbsp;
              {selectedProducts.ssd.cell_type}
              &emsp;サイズ:&nbsp;
              {selectedProducts.ssd.size}
              &emsp;インターフェース:&nbsp;{selectedProducts.ssd.interface}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    buildList.push(
      <Container>
        <h5>SSD</h5>未選択
      </Container>
    );
  }

  const selectedProductsValues = Object.values(selectedProducts);
  const total = selectedProductsValues.reduce(
    (acc, cur) => (cur === null ? acc : cur.price + acc),
    0
  );
  buildList.push(
    <Container className="mb-5">
      <h5>合計 ￥{total.toLocaleString()}</h5>
    </Container>
  );
  setTotal(total);

  return buildList;
}

export default function Home() {
  const [selectedProducts, setSelected] = useState({
    cpu: null,
    memory: null,
    motherboard: null,
    gpu: null,
    ssd: null,
  });
  const [total, setTotal] = useState(0);

  return (
    <>
      <Navbar className="mb-3" bg="light">
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
                <Nav.Item style={{ marginTop: "10vh" }}>
                  <Nav.Link eventKey="build">
                    ￥{total.toLocaleString()}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="cpu">
                  <Cpu
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="memory">
                  <Memory
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="motherboard">
                  <Motherboard
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="gpu">
                  <Gpu
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="ssd">
                  <Ssd
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="build">
                  <Build
                    selectedProducts={selectedProducts}
                    setTotal={setTotal}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}
