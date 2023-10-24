import {
  Accordion,
  Button,
  Form,
  InputGroup,
  Modal,
  Stack,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

// WIP: ソート・フィルタ機能
export default function FilterOption({
  show,
  handleClose,
  type,
  buf,
  sql,
  setConvertedProducts,
  submittedFilterOption,
  setSubmittedFilterOption,
}) {
  function Accordions({ type }) {
    switch (type) {
      case "cpu":
        let coreCountList = [];
        let cpuSocketList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const coreCountRes = db.exec(
            "SELECT DISTINCT core_count FROM cpu WHERE core_count IS NOT NULL ORDER BY core_count",
          );
          coreCountList = coreCountRes[0].values.flat();
          const cpuSocketRes = db.exec(
            "SELECT DISTINCT socket FROM cpu WHERE socket IS NOT NULL ORDER BY socket",
          );
          cpuSocketList = cpuSocketRes[0].values.flat();
        }

        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>コア数</Accordion.Header>
              <Accordion.Body>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2">
                    {coreCountList.slice(0, 7).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                  <div className="p-2">
                    {coreCountList.slice(7, 14).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                  <div className="p-2">
                    {coreCountList.slice(14).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ソケット</Accordion.Header>
              <Accordion.Body>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2">
                    {cpuSocketList.slice(0, 10).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                  <div className="p-2">
                    {cpuSocketList.slice(10).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                </Stack>
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
        let memoryCapacityList = [];
        let pcsList = [];
        let standardList = [];
        let memoryInterfaceList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const memoryCapacityRes = db.exec(
            "SELECT DISTINCT capacity FROM memory WHERE capacity != '' ORDER BY capacity",
          );
          memoryCapacityList = memoryCapacityRes[0].values.flat();

          const pcsRes = db.exec(
            "SELECT DISTINCT pcs FROM memory WHERE pcs IS NOT NULL ORDER BY pcs",
          );
          pcsList = pcsRes[0].values.flat();

          const standardRes = db.exec(
            "SELECT DISTINCT standard FROM memory WHERE standard != '' ORDER BY standard",
          );
          standardList = standardRes[0].values.flat();

          const memoryInterfaceRes = db.exec(
            "SELECT DISTINCT interface FROM memory WHERE interface != '' ORDER BY interface",
          );
          memoryInterfaceList = memoryInterfaceRes[0].values.flat();
        }

        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>容量</Accordion.Header>
              <Accordion.Body>
                <Stack direction="horizontal" gap={2}>
                  <div className="p-2">
                    {memoryCapacityList.slice(0, 8).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                  <div className="p-2">
                    {memoryCapacityList.slice(8).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>枚数</Accordion.Header>
              <Accordion.Body>
                {pcsList.map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>規格</Accordion.Header>
              <Accordion.Body>
                {standardList.map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>インターフェース</Accordion.Header>
              <Accordion.Body>
                {memoryInterfaceList.map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "motherboard":
        let formfactorList = [];
        let motherboardSocketList = [];
        let chipsetList = [];
        let motherboardMemoryList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const formfactorRes = db.exec(
            "SELECT DISTINCT form_factor FROM motherboard WHERE form_factor != '' ORDER BY form_factor",
          );
          formfactorList = formfactorRes[0].values.flat();

          const motherboardSocketRes = db.exec(
            "SELECT DISTINCT socket FROM motherboard WHERE socket != '' AND socket NOT LIKE '%Onboard%' ORDER BY socket",
          );
          motherboardSocketList = motherboardSocketRes[0].values.flat();

          const chipsetRes = db.exec(
            "SELECT DISTINCT chipset FROM motherboard WHERE chipset != '' ORDER BY chipset",
          );
          chipsetList = chipsetRes[0].values.flat();

          const motherboardMemoryRes = db.exec(
            "SELECT DISTINCT memory FROM motherboard WHERE memory != '' ORDER BY memory",
          );
          motherboardMemoryList = motherboardMemoryRes[0].values.flat();
        }

        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>フォームファクタ</Accordion.Header>
              <Accordion.Body>
                {formfactorList.map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ソケット</Accordion.Header>
              <Accordion.Body>
                <Stack direction="horizontal" gap={2}>
                  <div className="p-2">
                    {motherboardSocketList.slice(0, 7).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                  <div className="p-2">
                    {motherboardSocketList.slice(7).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>チップセット</Accordion.Header>
              <Accordion.Body>
                <Stack direction="horizontal" gap={2}>
                  <div className="p-2">
                    {chipsetList.slice(0, 28).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                  <div className="p-2">
                    {chipsetList.slice(28).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>メモリ</Accordion.Header>
              <Accordion.Body>
                {motherboardMemoryList.map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "gpu":
        let gpuList = [];
        let busList = [];
        let gpuMemoryList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const gpuRes = db.exec(
            "SELECT DISTINCT gpu_name FROM gpu WHERE gpu_name != '' AND gpu_name NOT LIKE '%ATI%' AND gpu_name NOT LIKE '%MATROX%' ORDER BY gpu_name",
          );
          gpuList = gpuRes[0].values.flat();

          const busRes = db.exec(
            "SELECT DISTINCT bus_interface FROM gpu WHERE bus_interface != '' AND bus_interface LIKE '%PCI%' ORDER BY bus_interface",
          );
          busList = busRes[0].values.flat();

          const gpuMemoryRes = db.exec(
            "SELECT DISTINCT memory FROM gpu WHERE memory != '' ORDER BY memory",
          );
          gpuMemoryList = gpuMemoryRes[0].values.flat();
        }

        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>GPU</Accordion.Header>
              <Accordion.Body>
                {gpuList.map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>バスインターフェース</Accordion.Header>
              <Accordion.Body>
                {busList.map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>メモリ</Accordion.Header>
              <Accordion.Body>
                <Stack direction="horizontal" gap={2}>
                  <div className="p-2">
                    {gpuMemoryList.slice(0, 26).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                  <div className="p-2">
                    {gpuMemoryList.slice(26).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "ssd":
        let ssdCapacityList = [];
        let sizeList = [];
        let ssdInterfaceList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const ssdCapacityRes = db.exec(
            "SELECT DISTINCT capacity FROM ssd WHERE capacity != '' ORDER BY capacity",
          );
          ssdCapacityList = ssdCapacityRes[0].values.flat();

          const sizeRes = db.exec(
            "SELECT DISTINCT size FROM ssd WHERE size != '' ORDER BY size",
          );
          sizeList = sizeRes[0].values.flat();

          const ssdInterfaceRes = db.exec(
            "SELECT DISTINCT interface FROM ssd WHERE interface != '' AND interface NOT LIKE '%USB%' ORDER BY interface",
          );
          ssdInterfaceList = ssdInterfaceRes[0].values.flat();
        }

        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>容量</Accordion.Header>
              <Accordion.Body>
                <Stack direction="horizontal" gap={2}>
                  <div className="p-2">
                    {ssdCapacityList.slice(0, 19).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                  <div className="p-2">
                    {ssdCapacityList.slice(19).map((type) => (
                      <Form.Check key={type} value={type} label={type} />
                    ))}
                  </div>
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>サイズ</Accordion.Header>
              <Accordion.Body>
                {sizeList.map((type) => (
                  <Form.Check key={type} value={type} label={type} />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>インターフェース</Accordion.Header>
              <Accordion.Body>
                {ssdInterfaceList.map((type) => (
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

    if (buf && sql) {
      const db = new sql.Database(new Uint8Array(buf));
      let productList = [];
      db.each(`SELECT * FROM ${type} ${where} ${sort} LIMIT 30`, (row) => {
        productList.push(row);
      });
      console.log(productList);
      setConvertedProducts(productList);
    }

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
