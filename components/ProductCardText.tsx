import { Case } from "@/db/Case";
import { Cpu } from "@/db/Cpu";
import { Gpu } from "@/db/Gpu";
import { Memory } from "@/db/Memory";
import { Motherboard } from "@/db/Motherboard";
import { Psu } from "@/db/Psu";
import { Ssd } from "@/db/Ssd";
import { productInfo, productType } from "@/types";
import { formatKb } from "@/utils/formatKb";
import { Badge, Group } from "@mantine/core";

function HideableBadge({
  text,
  suffix = "",
}: {
  text: string | number | null;
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
  type: productType;
  product: productInfo;
}) {
  switch (type) {
    case "cpu":
      product = product as Cpu;
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
      product = product as Memory;
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
      product = product as Motherboard;
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
      product = product as Gpu;
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge text={product.bus_interface} />
          <HideableBadge text={product.standard} />
          <HideableBadge
            text={product.capacity ? formatKb(product.capacity) : null}
          />
          <HideableBadge
            text={
              product.monitor ? JSON.parse(product.monitor).join(" / ") : null
            }
          />
        </Group>
      );

    case "ssd":
      product = product as Ssd;
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
      product = product as Psu;
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge text={product.capacity} suffix="W" />
          <HideableBadge text={product.certification} />
        </Group>
      );

    case "case":
      product = product as Case;
      return (
        <Group mt="xs" gap="5px">
          <Badge tt="none">{product.sales_rank ?? "- "}位</Badge>
          <HideableBadge
            text={
              product.support_motherboard
                ? JSON.parse(product.support_motherboard).join(" / ")
                : null
            }
          />
          <HideableBadge text={product.volume} suffix="L" />
          <HideableBadge text={product.psu_included ? "電源付属" : null} />
        </Group>
      );

    default:
      return null;
  }
}
