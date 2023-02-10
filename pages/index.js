import Cpu from "@/components/Cpu";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { CosmosClient } from "@azure/cosmos";

export default function Home({ results }) {
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
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Cpu>{results}</Cpu>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const key = process.env.COSMOS_KEY;
  const endpoint = process.env.COSMOS_ENDPOINT;
  const client = new CosmosClient({ endpoint, key });

  //SELECT * FROM PcParts c WHERE c.id = "98203aef-7f87-454c-8bfb-987f7b79158d"
  const query = {
    query:
      "SELECT c.name, c.price, c.sales_rank, c.manufacturer, c.frequency, c.socket, c.core_count, c.thread_count FROM PcParts p JOIN c IN p.cpu ",
  };
  const { resources: results } = await client
    .database("Main")
    .container("PcParts")
    .items.query(query)
    .fetchAll();

  //console.log(results);

  return {
    props: {
      results,
    },
  };
}
