import { Badge, Card } from "react-bootstrap";

export default function ProductCardText({ type, product }) {
  switch (type) {
    case "cpu":
      return (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          <Badge>{product.sales_rank}位</Badge>&nbsp;
          <Badge bg="secondary">{product.frequency}GHz</Badge>&nbsp;
          <Badge bg="secondary">{product.socket}</Badge>&nbsp;
          <Badge bg="secondary">{product.core_count}コア</Badge>&nbsp;
          <Badge bg="secondary">{product.thread_count}スレッド</Badge>
        </Card.Text>
      );

    case "memory":
      return (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          <Badge>{product.sales_rank}位</Badge>&nbsp;
          <Badge bg="secondary">{product.capacity}</Badge>&nbsp;
          <Badge bg="secondary">{product.pcs}枚</Badge>&nbsp;
          <Badge bg="secondary">{product.standard}</Badge>&nbsp;
          <Badge bg="secondary">{product.interface}</Badge>
        </Card.Text>
      );

    case "motherboard":
      return (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          <Badge>{product.sales_rank}位</Badge>&nbsp;
          <Badge bg="secondary">{product.form_factor}</Badge>&nbsp;
          <Badge bg="secondary">{product.socket}</Badge>&nbsp;
          <Badge bg="secondary">{product.chipset}</Badge>&nbsp;
          <Badge bg="secondary">{product.memory}</Badge>
        </Card.Text>
      );

    case "gpu":
      return (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          <Badge>{product.sales_rank}位</Badge>&nbsp;
          <Badge bg="secondary">{product.bus_interface}</Badge>&nbsp;
          <Badge bg="secondary">{product.memory}</Badge>&nbsp;
          <Badge bg="secondary">{product.monitor}</Badge>
        </Card.Text>
      );

    case "ssd":
      return (
        <Card.Text style={{ wordBreak: "keep-all" }}>
          <Badge>{product.sales_rank}位</Badge>&nbsp;
          <Badge bg="secondary">{product.capacity}</Badge>&nbsp;
          <Badge bg="secondary">{product.cell_type}</Badge>&nbsp;
          <Badge bg="secondary">{product.size}</Badge>&nbsp;
          <Badge bg="secondary">{product.interface}</Badge>
        </Card.Text>
      );

    default:
      return null;
  }
}
