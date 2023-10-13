import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

export default function BuildTab({ selectedProducts, setTotal }) {
  console.log(selectedProducts);
  let buildList = [];

  if (selectedProducts.cpu) {
    buildList.push(
      <Container key="cpu">
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
      </Container>,
    );
  } else {
    buildList.push(
      <Container key="cpu">
        <h5>CPU</h5>未選択
      </Container>,
    );
  }

  if (selectedProducts.memory) {
    buildList.push(
      <Container key="memory">
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
      </Container>,
    );
  } else {
    buildList.push(
      <Container key="memory">
        <h5>メモリ</h5>未選択
      </Container>,
    );
  }

  if (selectedProducts.motherboard) {
    buildList.push(
      <Container key="motherboard">
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
      </Container>,
    );
  } else {
    buildList.push(
      <Container key="motherboard">
        <h5>マザーボード</h5>未選択
      </Container>,
    );
  }

  if (selectedProducts.gpu) {
    buildList.push(
      <Container key="gpu">
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
              {selectedProducts.gpu.monitor}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>,
    );
  } else {
    buildList.push(
      <Container key="gpu">
        <h5>GPU</h5>未選択
      </Container>,
    );
  }

  if (selectedProducts.ssd) {
    buildList.push(
      <Container key="ssd">
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
      </Container>,
    );
  } else {
    buildList.push(
      <Container key="ssd">
        <h5>SSD</h5>未選択
      </Container>,
    );
  }

  const selectedProductsValues = Object.values(selectedProducts);
  const total = selectedProductsValues.reduce(
    (acc, cur) => (cur === null ? acc : cur.price + acc),
    0,
  );
  buildList.push(
    <Container key="total" className="mb-5">
      <h5>合計 ￥{total.toLocaleString()}</h5>
    </Container>,
  );
  setTotal(total);

  return buildList;
}
