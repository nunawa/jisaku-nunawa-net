import { Badge, Card } from "react-bootstrap";

export default function ProductCardText({
  type,
  product,
}: {
  type: any;
  product: any;
}) {
  switch (type) {
    case "cpu":
      return (
        <Card.Text>
          <Badge className="me-1">{product.sales_rank ?? "- "}位</Badge>
          <Badge className="me-1" bg="secondary">
            {product.frequency}GHz
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.socket}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.core_count}コア
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.thread_count}スレッド
          </Badge>
        </Card.Text>
      );

    case "memory":
      return (
        <Card.Text>
          <Badge className="me-1">{product.sales_rank ?? "- "}位</Badge>
          <Badge className="me-1" bg="secondary">
            {product.capacity}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.pcs}枚
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.standard}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.interface}
          </Badge>
        </Card.Text>
      );

    case "motherboard":
      return (
        <Card.Text>
          <Badge className="me-1">{product.sales_rank ?? "- "}位</Badge>
          <Badge className="me-1" bg="secondary">
            {product.form_factor}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.socket}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.chipset}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.memory}
          </Badge>
        </Card.Text>
      );

    case "gpu":
      return (
        <Card.Text>
          <Badge className="me-1">{product.sales_rank ?? "- "}位</Badge>
          <Badge className="me-1" bg="secondary">
            {product.bus_interface}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.standard}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.capacity}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {JSON.parse(product.monitor).join(" / ")}
          </Badge>
        </Card.Text>
      );

    case "ssd":
      return (
        <Card.Text>
          <Badge className="me-1">{product.sales_rank ?? "- "}位</Badge>
          <Badge className="me-1" bg="secondary">
            {product.capacity}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.cell_type}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.size}
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.interface}
          </Badge>
        </Card.Text>
      );

    case "psu":
      return (
        <Card.Text>
          <Badge className="me-1">{product.sales_rank ?? "- "}位</Badge>
          <Badge className="me-1" bg="secondary">
            {product.capacity}W
          </Badge>
          <Badge className="me-1" bg="secondary">
            {product.certification}
          </Badge>
        </Card.Text>
      );

    default:
      return null;
  }
}
