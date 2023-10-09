import { Accordion, Modal, Button, InputGroup, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

// WIP: ソート・フィルタ機能
export default function FilterOption({
  show,
  handleClose,
  type,
  db,
  setConvertedProducts,
  submittedFilterOption,
  setSubmittedFilterOption,
}) {
  function Accordions({ type }) {
    switch (type) {
      case "cpu":
        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>コア数</Accordion.Header>
              <Accordion.Body>
                {[
                  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 64,
                ].map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ソケット</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>内蔵GPU</Accordion.Header>
              <Accordion.Body>
                <Form.Check
                  defaultChecked={true}
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "memory":
        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>容量</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>枚数</Accordion.Header>
              <Accordion.Body>
                {[1, 2, 3, 4, 8].map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>規格</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>インターフェース</Accordion.Header>
              <Accordion.Body>
                {["DIMM", "S.O.DIMM", "MicroDIMM", "RIMM"].map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "motherboard":
        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>フォームファクタ</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ソケット</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>チップセット</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>メモリ</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "gpu":
        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>GPU</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>バスインターフェース</Accordion.Header>
              <Accordion.Body>
                {["PCI Express 4.0", "PCI Express 3.0", "PCI Express 2.0"].map(
                  (type) => (
                    <Form.Check key={type} value={type} label={type} />
                  ),
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>メモリ</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "ssd":
        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>容量</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>サイズ</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>インターフェース</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      default:
        break;
    }
  }

  const { register, handleSubmit, resetField, setValue } = useForm();

  function onSubmit(data) {
    console.log(data);
    setSubmittedFilterOption(data);

    let sort = "";
    if (data.sort == "sales_rank_asc") {
      sort = "ORDER BY (sales_rank IS NULL), sales_rank";
    } else if (data.sort == "price_asc") {
      sort = "ORDER BY (price IS NULL), price";
    }

    let keyword = "";
    if (data.keyword) {
      keyword = `manufacturer || " " || name LIKE "%${data.keyword}%"`;
    }

    let minMax = "";
    const min = Number(data.min);
    const max = Number(data.max);
    if (min && max && min <= max) {
      minMax = `price >= ${min} AND price <= ${max}`;
    } else if (min) {
      minMax = `price >= ${min}`;
    } else if (max) {
      minMax = `price <= ${max}`;
    }

    let where = "";
    if (keyword && minMax) {
      where = `WHERE ${keyword} AND ${minMax}`;
    } else if (keyword) {
      where = `WHERE ${keyword}`;
    } else if (minMax) {
      where = `WHERE ${minMax}`;
    }

    window
      .initSqlJs({
        locateFile: (file) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
      })
      .then((sql) => {
        if (db) {
          const dbf = new sql.Database(new Uint8Array(db));
          let productList = [];
          dbf.each(`SELECT * FROM ${type} ${where} ${sort} LIMIT 30`, (row) => {
            productList.push(row);
          });
          console.log(productList);
          setConvertedProducts(productList);
        }
      });
    handleClose();
  }

  function onHide() {
    setValue("sort", submittedFilterOption.sort);
    setValue("keyword", submittedFilterOption.keyword);
    setValue("min", submittedFilterOption.min);
    setValue("max", submittedFilterOption.max);
    handleClose();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Select defaultValue="sales_rank_asc" {...register("sort")}>
              <option value="sales_rank_asc">売上順</option>
              <option value="price_asc">価格順</option>
            </Form.Select>
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control placeholder="キーワード" {...register("keyword")} />
            <Button
              variant="outline-secondary"
              onClick={() => {
                resetField("keyword");
              }}
            >
              クリア
            </Button>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>￥</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="以上"
              {...register("min")}
            />
            <InputGroup.Text>～</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="以下"
              {...register("max")}
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                resetField("min");
                resetField("max");
              }}
            >
              クリア
            </Button>
          </InputGroup>
          <Accordions type={type} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            キャンセル
          </Button>
          <Button type="submit" variant="primary">
            適用
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
