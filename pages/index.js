import Build from "@/components/Build";
import Parts from "@/components/Parts";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

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
          <Navbar.Brand href="/">jisaku.nunawa.net</Navbar.Brand>
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
                <Nav.Item className="mb-2">
                  <Nav.Link eventKey="cpu">CPU</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link eventKey="memory">メモリ</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link eventKey="motherboard">マザーボード</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link eventKey="gpu">GPU</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link eventKey="ssd">SSD</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link eventKey="build">
                    ￥{total.toLocaleString()}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="cpu">
                  <Parts
                    type="cpu"
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="memory">
                  <Parts
                    type="memory"
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="motherboard">
                  <Parts
                    type="motherboard"
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="gpu">
                  <Parts
                    type="gpu"
                    selectedProducts={selectedProducts}
                    setSelected={setSelected}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="ssd">
                  <Parts
                    type="ssd"
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
