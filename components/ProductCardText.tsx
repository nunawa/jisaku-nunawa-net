import { formatKb } from "@/utils/formatKb";
import { Badge, Group } from "@mantine/core";

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
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <Badge variant="default" tt="none">
            {product.frequency}GHz
          </Badge>
          <Badge variant="default" tt="none">
            {product.socket}
          </Badge>
          <Badge variant="default" tt="none">
            {product.core_count}コア
          </Badge>
          <Badge variant="default" tt="none">
            {product.thread_count}スレッド
          </Badge>
        </Group>
      );

    case "memory":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <Badge variant="default" tt="none">
            {product.capacity ? formatKb(product.capacity) : ""}
          </Badge>
          <Badge variant="default" tt="none">
            {product.pcs}枚
          </Badge>
          <Badge variant="default" tt="none">
            {product.standard}
          </Badge>
          <Badge variant="default" tt="none">
            {product.interface}
          </Badge>
        </Group>
      );

    case "motherboard":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <Badge variant="default" tt="none">
            {product.form_factor}
          </Badge>
          <Badge variant="default" tt="none">
            {product.socket}
          </Badge>
          <Badge variant="default" tt="none">
            {product.chipset}
          </Badge>
          <Badge variant="default" tt="none">
            {product.memory}
          </Badge>
        </Group>
      );

    case "gpu":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <Badge variant="default" tt="none">
            {product.bus_interface}
          </Badge>
          <Badge variant="default" tt="none">
            {product.standard}
          </Badge>
          <Badge variant="default" tt="none">
            {product.capacity ? formatKb(product.capacity) : ""}
          </Badge>
          <Badge variant="default" tt="none">
            {JSON.parse(product.monitor).join(" / ")}
          </Badge>
        </Group>
      );

    case "ssd":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <Badge variant="default" tt="none">
            {product.capacity ? formatKb(product.capacity) : ""}
          </Badge>
          <Badge variant="default" tt="none">
            {product.cell_type}
          </Badge>
          <Badge variant="default" tt="none">
            {product.size}
          </Badge>
          <Badge variant="default" tt="none">
            {product.interface}
          </Badge>
        </Group>
      );

    case "psu":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <Badge variant="default" tt="none">
            {product.capacity}W
          </Badge>
          <Badge variant="default" tt="none">
            {product.certification}
          </Badge>
        </Group>
      );

    case "case":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <Badge variant="default" tt="none">
            {JSON.parse(product.support_motherboard).join(" / ")}
          </Badge>
          <Badge variant="default" tt="none">
            {product.volume ? `${product.volume}L` : ""}
          </Badge>
          <Badge variant="default" tt="none">
            {product.psu_included ? "電源付属" : ""}
          </Badge>
        </Group>
      );

    default:
      return null;
  }
}
