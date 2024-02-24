import BuildTab from "@/components/BuildTab";
import PartsTab from "@/components/PartsTab";
import TotalPrice from "@/components/TotalPrice";
import styles from "@/styles/TabNav.module.scss";
import { useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Row,
  Tab,
} from "react-bootstrap";
import useSWRImmutable from "swr/immutable";

const fetcher = (...args) => fetch(...args).then((res) => res.arrayBuffer());

function useBuf() {
  let { data } = useSWRImmutable(
    "https://bucket.nunawa.net/parts_latest.db",
    fetcher,
  );

  return {
    buf: data,
  };
}

export default function Home() {
  const { buf } = useBuf();
  const [sql, setSql] = useState();

  if (typeof window !== "undefined") {
    window
      .initSqlJs({
        locateFile: (file) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.9.0/${file}`,
      })
      .then((SQL) => setSql(SQL));
  }

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
              <Nav
                variant="pills"
                className={"flex-column " + styles["nav-normal"]}
              >
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
                    <TotalPrice />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav
                className={
                  "mb-3 justify-content-center " + styles["nav-dropdown"]
                }
              >
                <Dropdown>
                  <Dropdown.Toggle>パーツの種類を選択</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Nav.Item}>
                      <Nav.Link eventKey="cpu">CPU</Nav.Link>
                    </Dropdown.Item>
                    <Dropdown.Item as={Nav.Item}>
                      <Nav.Link eventKey="memory">メモリ</Nav.Link>
                    </Dropdown.Item>
                    <Dropdown.Item as={Nav.Item}>
                      <Nav.Link eventKey="motherboard">マザーボード</Nav.Link>
                    </Dropdown.Item>
                    <Dropdown.Item as={Nav.Item}>
                      <Nav.Link eventKey="gpu">GPU</Nav.Link>
                    </Dropdown.Item>
                    <Dropdown.Item as={Nav.Item}>
                      <Nav.Link eventKey="ssd">SSD</Nav.Link>
                    </Dropdown.Item>
                    <Dropdown.Item as={Nav.Item}>
                      <Nav.Link eventKey="build">
                        <TotalPrice />
                      </Nav.Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="cpu">
                  <PartsTab type="cpu" buf={buf} sql={sql} />
                </Tab.Pane>
                <Tab.Pane eventKey="memory">
                  <PartsTab type="memory" buf={buf} sql={sql} />
                </Tab.Pane>
                <Tab.Pane eventKey="motherboard">
                  <PartsTab type="motherboard" buf={buf} sql={sql} />
                </Tab.Pane>
                <Tab.Pane eventKey="gpu">
                  <PartsTab type="gpu" buf={buf} sql={sql} />
                </Tab.Pane>
                <Tab.Pane eventKey="ssd">
                  <PartsTab type="ssd" buf={buf} sql={sql} />
                </Tab.Pane>
                <Tab.Pane eventKey="build">
                  <BuildTab />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}
