import { formatKb } from "@/utils/formatKb";
import { Badge, Group } from "@mantine/core";

function HideableBadge({
  text,
  suffix = "",
}: {
  text: string | null;
  suffix?: string;
}) {
  if (text) {
    return (
      <Badge variant="default" tt="none">
        {text}
        {suffix}
      </Badge>
    );
  } else {
    return <></>;
  }
}

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
          <HideableBadge text={product.frequency} suffix="GHz" />
          <HideableBadge text={product.socket} />
          <HideableBadge text={product.core_count} suffix="コア" />
          <HideableBadge text={product.thread_count} suffix="スレッド" />
        </Group>
      );

    case "memory":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge
            text={product.capacity ? formatKb(product.capacity) : null}
          />
          <HideableBadge text={product.pcs} suffix="枚" />
          <HideableBadge text={product.standard} />
          <HideableBadge text={product.interface} />
        </Group>
      );

    case "motherboard":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge text={product.form_factor} />
          <HideableBadge text={product.socket} />
          <HideableBadge text={product.chipset} />
          <HideableBadge text={product.memory} />
        </Group>
      );

    case "gpu":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge text={product.bus_interface} />
          <HideableBadge text={product.standard} />
          <HideableBadge
            text={product.capacity ? formatKb(product.capacity) : null}
          />
          <HideableBadge text={JSON.parse(product.monitor).join(" / ")} />
        </Group>
      );

    case "ssd":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge
            text={product.capacity ? formatKb(product.capacity) : null}
          />
          <HideableBadge text={product.cell_type} />
          <HideableBadge text={product.size} />
          <HideableBadge text={product.interface} />
        </Group>
      );

    case "psu":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge text={product.capacity} suffix="W" />
          <HideableBadge text={product.certification} />
        </Group>
      );

    case "case":
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge
            text={JSON.parse(product.support_motherboard).join(" / ")}
          />
          <HideableBadge text={product.volume} suffix="L" />
          <HideableBadge text={product.psu_included ? "電源付属" : null} />
        </Group>
      );

    default:
      return null;
  }
}
