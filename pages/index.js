import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import Parts from "@/components/Parts";

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
              <Tab.Content>
                <Tab.Pane eventKey="cpu">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>コア数</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28,
                            32, 64,
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>ソケット</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "LGA1150",
                            "LGA1151",
                            "LGA1155",
                            "LGA1156",
                            "LGA1200",
                            "LGA1700",
                            "LGA2011",
                            "LGA2011-3",
                            "LGA2066",
                            "LGA3647",
                            "LGA4189",
                            "LGA775",
                            "Socket 771",
                            "Socket AM4",
                            "Socket AM5",
                            "Socket F",
                            "Socket sTRX4",
                            "Socket sWRX8",
                            "Socket TR4",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>内蔵GPU</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          <Form.Check
                            checked
                            type="radio"
                            name="igpu"
                            value={false}
                            label="なし"
                          />
                          <Form.Check
                            type="radio"
                            name="igpu"
                            value={true}
                            label="あり"
                          />
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="memory">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>容量</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "128GB",
                            "64GB",
                            "32GB",
                            "16GB",
                            "8GB",
                            "4GB",
                            "2GB",
                            "1GB",
                            "512MB",
                            "256MB",
                            "128MB",
                            "64MB",
                            "32MB",
                            "16MB",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>枚数</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[1, 2, 3, 4, 8].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>規格</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "DDR5 SDRAM",
                            "DDR4 SDRAM",
                            "DDR3 SDRAM",
                            "DDR2 SDRAM",
                            "DDR SDRAM",
                            "SDRAM",
                            "RDRAM",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>インターフェース</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {["DIMM", "S.O.DIMM", "MicroDIMM", "RIMM"].map(
                            (type) => (
                              <Form.Check
                                key={type}
                                value={type}
                                label={type}
                              />
                            )
                          )}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="motherboard">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>フォームファクタ</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "ATX",
                            "MicroATX",
                            "Mini ITX",
                            "Extended",
                            "Proprietary",
                            "FlexATX",
                            "CEB",
                            "SSI EEB",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>ソケット</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "LGA1150",
                            "LGA1151",
                            "LGA1155",
                            "LGA1156",
                            "LGA1200",
                            "LGA1366",
                            "LGA1700",
                            "LGA2011",
                            "LGA2011-3",
                            "LGA2066",
                            "LGA3647",
                            "LGA4189",
                            "Socket SP3",
                            "Socket sWRX8",
                            "SocketAM2",
                            "SocketAM2+/SocketAM2",
                            "SocketAM3",
                            "SocketAM4",
                            "SocketAM5",
                            "SocketFM2",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>チップセット</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "INTELZ790",
                            "INTELZ690",
                            "INTELZ590",
                            "INTELZ490",
                            "INTELX79",
                            "INTELX58+ICH10R",
                            "INTELX299",
                            "INTELW580",
                            "INTELW480E",
                            "INTELW480",
                            "INTELQ87",
                            "INTELQ470E",
                            "INTELQ470",
                            "INTELQ370",
                            "INTELQ170",
                            "INTELP55",
                            "INTELH81",
                            "INTELH770",
                            "INTELH670",
                            "INTELH610",
                            "INTELH61",
                            "INTELH570",
                            "INTELH510",
                            "INTELH410",
                            "INTELH310",
                            "INTELH110",
                            "INTELCM236",
                            "INTELC627",
                            "INTELC622",
                            "INTELC621A",
                            "INTELC621",
                            "INTELC612",
                            "INTELC422",
                            "INTELC256",
                            "INTELC252",
                            "INTELC246",
                            "INTELC242",
                            "INTELC236",
                            "INTELC232",
                            "INTELB760",
                            "INTELB660",
                            "INTELB560",
                            "INTELB460",
                            "AMDX670E",
                            "AMDX670",
                            "AMDX570",
                            "AMDX470",
                            "AMDWRX80",
                            "AMDB650E",
                            "AMDB650",
                            "AMDB550",
                            "AMDB450",
                            "AMDA85X",
                            "AMDA520",
                            "AMDA320",
                            "AMD890GX+SB850",
                            "AMD790FX+SB750",
                            "AMD790FX+SB600",
                            "VIAK8M890+VT8237S",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>メモリ</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "DIMM DDR5",
                            "DIMM DDR4",
                            "DIMM DDR3",
                            "S.O.DIMM DDR4",
                            "S.O.DIMM DDR3",
                            "S.O.DIMM DDR3L",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="gpu">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>GPU</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "NVIDIA RTX A6000",
                            "NVIDIA RTX A5500",
                            "NVIDIA RTX A5000",
                            "NVIDIA RTX A4500",
                            "NVIDIA RTX A4000",
                            "NVIDIA RTX A2000",
                            "NVIDIA Quadro T1000",
                            "NVIDIA Quadro RTX 5000",
                            "NVIDIA Quadro RTX 4000",
                            "NVIDIA Quadro RTX 3000",
                            "NVIDIA Quadro P620",
                            "NVIDIA Quadro P2200",
                            "NVIDIA Quadro NVS 285",
                            "NVIDIA Quadro K6000",
                            "NVIDIA Quadro GV100",
                            "NVIDIA Quadro GP100",
                            "NVIDIA Quadro FX 5800",
                            "NVIDIA GeForce RTX 4090",
                            "NVIDIA GeForce RTX 4080",
                            "NVIDIA GeForce RTX 4070 Ti",
                            "NVIDIA GeForce RTX 3090 Ti",
                            "NVIDIA GeForce RTX 3090",
                            "NVIDIA GeForce RTX 3080 Ti",
                            "NVIDIA GeForce RTX 3080",
                            "NVIDIA GeForce RTX 3070 Ti",
                            "NVIDIA GeForce RTX 3070",
                            "NVIDIA GeForce RTX 3060 Ti",
                            "NVIDIA GeForce RTX 3060",
                            "NVIDIA GeForce RTX 3050",
                            "NVIDIA GeForce RTX 2060",
                            "NVIDIA GeForce GTX 980",
                            "NVIDIA GeForce GTX 560 Ti",
                            "NVIDIA GeForce GTX 480",
                            "NVIDIA GeForce GTX 280",
                            "NVIDIA GeForce GTX 1660 Ti",
                            "NVIDIA GeForce GTX 1660 SUPER",
                            "NVIDIA GeForce GTX 1660",
                            "NVIDIA GeForce GTX 1650 (G6)",
                            "NVIDIA GeForce GTX 1650 (G5)",
                            "NVIDIA GeForce GTX 1630",
                            "NVIDIA GeForce GTX 1050 Ti",
                            "NVIDIA GeForce GTS 450",
                            "NVIDIA GeForce GT 730 (64-bit GDDR5)",
                            "NVIDIA GeForce GT 730 (64-bit DDR3)",
                            "NVIDIA GeForce GT 730 (128-bit DDR3)",
                            "NVIDIA GeForce GT 710",
                            "NVIDIA GeForce GT 430",
                            "NVIDIA GeForce GT 220",
                            "NVIDIA GeForce GT 1030",
                            "NVIDIA A40",
                            "NVIDIA A30",
                            "NVIDIA A100",
                            "Intel Arc A770",
                            "Intel Arc A750",
                            "Intel Arc A380",
                            "AMD Vega10",
                            "AMD Radeon RX 7900 XTX",
                            "AMD Radeon RX 7900 XT",
                            "AMD Radeon RX 6950 XT",
                            "AMD Radeon RX 6900 XT",
                            "AMD Radeon RX 6850M XT",
                            "AMD Radeon RX 6800 XT",
                            "AMD Radeon RX 6800",
                            "AMD Radeon RX 6750 XT",
                            "AMD Radeon RX 6700 XT",
                            "AMD Radeon RX 6700",
                            "AMD Radeon RX 6650 XT",
                            "AMD Radeon RX 6600 XT",
                            "AMD Radeon RX 6600",
                            "AMD Radeon RX 6500 XT",
                            "AMD Radeon RX 6400",
                            "AMD Radeon RX 580",
                            "AMD Radeon RX 5700 XT",
                            "AMD Radeon RX 560",
                            "AMD Radeon RX 550",
                            "AMD Radeon Pro WX 8200",
                            "AMD Radeon Pro WX 3200",
                            "AMD Radeon Pro W6800",
                            "AMD Radeon Pro W6600",
                            "AMD Radeon Pro W6400",
                            "AMD Radeon Pro W5700X",
                            "AMD Radeon Pro W5500X",
                            "AMD Radeon 550",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>バスインターフェース</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "PCI Express 4.0",
                            "PCI Express 3.0",
                            "PCI Express 2.0",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>メモリ</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "HBM2e 80GB",
                            "HBM2 8GB",
                            "HBM2 32GB",
                            "HBM2 24GB",
                            "HBM2 16GB",
                            "GDDR6X 8GB",
                            "GDDR6X 24GB",
                            "GDDR6X 16GB",
                            "GDDR6X 12GB",
                            "GDDR6X 10GB",
                            "GDDR6 8GB",
                            "GDDR6 6GB",
                            "GDDR6 4GB",
                            "GDDR6 48GB",
                            "GDDR6 32GB",
                            "GDDR6 24GB",
                            "GDDR6 20GB",
                            "GDDR6 16GB",
                            "GDDR6 12GB",
                            "GDDR6 10GB",
                            "GDDR5X 5GB",
                            "GDDR5 8GB",
                            "GDDR5 6GB",
                            "GDDR5 4GB",
                            "GDDR5 2GB",
                            "GDDR5 1GB",
                            "GDDR5 12GB",
                            "GDDR5 1.5GB",
                            "GDDR3 4GB",
                            "GDDR3 1GB",
                            "DDR4 2GB",
                            "DDR3 4GB",
                            "DDR3 2GB",
                            "DDR3 1GB",
                            "DDR2 512MB",
                            "DDR2 128MB",
                            "16GB",
                            "12GB",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="ssd">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>容量</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "3000GB~",
                            "2000GB",
                            "960~1024GB",
                            "480~512GB",
                            "240~256GB",
                            "120~128GB",
                            "~64GB",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>サイズ</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "M.2 (Type22110)",
                            "M.2 (Type2280)",
                            "M.2 (Type2260)",
                            "M.2 (Type2242)",
                            "2.5インチ",
                            "1.8インチ",
                            "mSATA",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>インターフェース</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          {[
                            "PCI-Express Gen5",
                            "PCI-Express Gen4",
                            "PCI-Express Gen3",
                            "PCI-Express",
                            "Serial ATA 6Gb/s",
                            "Serial ATA",
                            "SAS 12Gb/s",
                            "USB",
                            "Thunderbolt/USB",
                            "IDE",
                          ].map((type) => (
                            <Form.Check key={type} value={type} label={type} />
                          ))}
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="build"></Tab.Pane>
              </Tab.Content>
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
