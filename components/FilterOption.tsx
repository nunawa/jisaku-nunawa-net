import { Case } from "@/db/Case";
import { Cpu } from "@/db/Cpu";
import { Gpu } from "@/db/Gpu";
import { Memory } from "@/db/Memory";
import { Motherboard } from "@/db/Motherboard";
import { Psu } from "@/db/Psu";
import { Ssd } from "@/db/Ssd";
import {
  caseFilterOption,
  cpuFilterOption,
  filterOptions,
  gpuFilterOption,
  memoryFilterOption,
  motherboardFilterOption,
  productInfo,
  productType,
  psuFilterOption,
  ssdFilterOption,
} from "@/types";
import {
  Button,
  Flex,
  Group,
  Input,
  Modal,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction } from "react";
import { DataSource, SelectQueryBuilder } from "typeorm";
import Accordions from "./Accordions";

function createRandomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function addInCondition(
  queryBuilder:
    | SelectQueryBuilder<Cpu>
    | SelectQueryBuilder<Memory>
    | SelectQueryBuilder<Motherboard>
    | SelectQueryBuilder<Gpu>
    | SelectQueryBuilder<Ssd>
    | SelectQueryBuilder<Psu>
    | SelectQueryBuilder<Case>,
  columnName: string,
  values: Record<string | number, boolean>,
) {
  const selectedValues = Object.entries(values)
    .filter(([, isSelected]) => isSelected)
    .map(([key]) => (key.includes("_") ? key.replaceAll("_", ".") : key));

  if (selectedValues.length > 0) {
    // パラメータ名を一意にするため6桁のランダムな文字列を追加
    const paramName = `${columnName}_${createRandomString(6)}`;
    return queryBuilder.andWhere(`${columnName} IN (:...${paramName})`, {
      [paramName]: selectedValues,
    }) as typeof queryBuilder;
  }

  return queryBuilder;
}

function addCpuQuery(
  queryBuilder: SelectQueryBuilder<Cpu>,
  values: cpuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "core_count",
    values.coreCount,
  ) as SelectQueryBuilder<Cpu>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "socket",
    values.socket,
  ) as SelectQueryBuilder<Cpu>;

  if (values.igpu.yes === true && values.igpu.no === false) {
    resultQueryBuilder = resultQueryBuilder.andWhere("gpu IS NOT NULL");
  } else if (values.igpu.yes === false && values.igpu.no === true) {
    resultQueryBuilder = resultQueryBuilder.andWhere("gpu IS NULL");
  }

  return resultQueryBuilder;
}

function addMemoryQuery(
  queryBuilder: SelectQueryBuilder<Memory>,
  values: memoryFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "capacity",
    values.capacity,
  ) as SelectQueryBuilder<Memory>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "pcs",
    values.pcs,
  ) as SelectQueryBuilder<Memory>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "standard",
    values.standard,
  ) as SelectQueryBuilder<Memory>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "interface",
    values.interface,
  ) as SelectQueryBuilder<Memory>;

  return resultQueryBuilder;
}

function addMotherboardQuery(
  queryBuilder: SelectQueryBuilder<Motherboard>,
  values: motherboardFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "form_factor",
    values.formFactor,
  ) as SelectQueryBuilder<Motherboard>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "socket",
    values.socket,
  ) as SelectQueryBuilder<Motherboard>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "chipset",
    values.chipset,
  ) as SelectQueryBuilder<Motherboard>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "memory",
    values.memory,
  ) as SelectQueryBuilder<Motherboard>;

  return resultQueryBuilder;
}

function addGpuQuery(
  queryBuilder: SelectQueryBuilder<Gpu>,
  values: gpuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "gpu_name",
    values.gpuName,
  ) as SelectQueryBuilder<Gpu>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "bus_interface",
    values.busInterface,
  ) as SelectQueryBuilder<Gpu>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "standard",
    values.standard,
  ) as SelectQueryBuilder<Gpu>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "capacity",
    values.capacity,
  ) as SelectQueryBuilder<Gpu>;

  return resultQueryBuilder;
}

function addSsdQuery(
  queryBuilder: SelectQueryBuilder<Ssd>,
  values: ssdFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "capacity",
    values.capacity,
  ) as SelectQueryBuilder<Ssd>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "size",
    values.size,
  ) as SelectQueryBuilder<Ssd>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "interface",
    values.interface,
  ) as SelectQueryBuilder<Ssd>;

  return resultQueryBuilder;
}

function addPsuQuery(
  queryBuilder: SelectQueryBuilder<Psu>,
  values: psuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "capacity",
    values.capacity,
  ) as SelectQueryBuilder<Psu>;

  resultQueryBuilder = addInCondition(
    resultQueryBuilder,
    "certification",
    values.certification,
  ) as SelectQueryBuilder<Psu>;

  return resultQueryBuilder;
}

function addCaseQuery(
  queryBuilder: SelectQueryBuilder<Case>,
  values: caseFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  if (values.psuIncluded.yes === true && values.psuIncluded.no === false) {
    resultQueryBuilder = resultQueryBuilder.andWhere("psu_included = true");
  } else if (
    values.psuIncluded.yes === false &&
    values.psuIncluded.no === true
  ) {
    resultQueryBuilder = resultQueryBuilder.andWhere("psu_included = false");
  }

  return resultQueryBuilder;
}

export default function FilterOption({
  opened,
  close,
  type,
  dataSource,
  setConvertedProducts,
}: {
  opened: boolean;
  close: () => void;
  type: productType;
  dataSource: DataSource | undefined;
  setConvertedProducts: Dispatch<SetStateAction<productInfo[] | undefined>>;
}) {
  const initialValues: filterOptions = {
    sort: "sales_rank_asc",
    keyword: "",
    min: "",
    max: "",
    cpu: {
      coreCount: {},
      socket: {},
      igpu: {
        yes: false,
        no: false,
      },
    },
    memory: {
      capacity: {},
      pcs: {},
      standard: {},
      interface: {},
    },
    motherboard: {
      formFactor: {},
      socket: {},
      chipset: {},
      memory: {},
    },
    gpu: {
      gpuName: {},
      busInterface: {},
      standard: {},
      capacity: {},
    },
    ssd: {
      capacity: {},
      size: {},
      interface: {},
    },
    psu: {
      capacity: {},
      certification: {},
    },
    case: {
      psuIncluded: {
        yes: false,
        no: false,
      },
    },
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues,
  });

  async function onSubmit(values: typeof form.values) {
    if (dataSource) {
      let queryBuilder:
        | SelectQueryBuilder<Cpu>
        | SelectQueryBuilder<Memory>
        | SelectQueryBuilder<Motherboard>
        | SelectQueryBuilder<Gpu>
        | SelectQueryBuilder<Ssd>
        | SelectQueryBuilder<Psu>
        | SelectQueryBuilder<Case>;

      switch (type) {
        case "cpu":
          queryBuilder = dataSource.getRepository(Cpu).createQueryBuilder(type);

          if (values.cpu) {
            queryBuilder = addCpuQuery(queryBuilder, values.cpu);
          }

          break;
        case "memory":
          queryBuilder = dataSource
            .getRepository(Memory)
            .createQueryBuilder(type);

          if (values.memory) {
            queryBuilder = addMemoryQuery(queryBuilder, values.memory);
          }

          break;
        case "motherboard":
          queryBuilder = dataSource
            .getRepository(Motherboard)
            .createQueryBuilder(type);

          if (values.motherboard) {
            queryBuilder = addMotherboardQuery(
              queryBuilder,
              values.motherboard,
            );
          }

          break;
        case "gpu":
          queryBuilder = dataSource.getRepository(Gpu).createQueryBuilder(type);

          if (values.gpu) {
            queryBuilder = addGpuQuery(queryBuilder, values.gpu);
          }

          break;
        case "ssd":
          queryBuilder = dataSource.getRepository(Ssd).createQueryBuilder(type);

          if (values.ssd) {
            queryBuilder = addSsdQuery(queryBuilder, values.ssd);
          }

          break;
        case "psu":
          queryBuilder = dataSource.getRepository(Psu).createQueryBuilder(type);

          if (values.psu) {
            queryBuilder = addPsuQuery(queryBuilder, values.psu);
          }

          break;
        case "case":
          queryBuilder = dataSource
            .getRepository(Case)
            .createQueryBuilder(type);

          if (values.case) {
            queryBuilder = addCaseQuery(queryBuilder, values.case);
          }

          break;
      }

      if (values.keyword) {
        queryBuilder = queryBuilder.andWhere(
          "concat(manufacturer, ' ', name) LIKE :keyword",
          { keyword: `%${values.keyword}%` },
        );
      }

      const min = Number(values.min);
      const max = Number(values.max);
      if (min && max && min <= max) {
        queryBuilder = queryBuilder.andWhere(
          "price >= :min AND price <= :max",
          { min: min, max: max },
        );
      } else if (min) {
        queryBuilder = queryBuilder.andWhere("price >= :min", { min: min });
      } else if (max) {
        queryBuilder = queryBuilder.andWhere("price <= :max", { max: max });
      }

      if (values.sort == "sales_rank_asc") {
        queryBuilder = queryBuilder.orderBy(
          "sales_rank",
          undefined,
          "NULLS LAST",
        );
      } else if (values.sort == "price_asc") {
        queryBuilder = queryBuilder.orderBy("price", undefined, "NULLS LAST");
      } else if (
        type === "cpu" &&
        values.sort === "multi_thread_price_performance_desc"
      ) {
        queryBuilder = queryBuilder
          .addSelect(
            "CAST(multi_thread_score as REAL) / CAST(price as REAL)",
            "multi_pp",
          )
          .orderBy("multi_pp", "DESC", "NULLS LAST");
      } else if (
        type === "cpu" &&
        values.sort === "single_thread_price_performance_desc"
      ) {
        queryBuilder = queryBuilder
          .addSelect(
            "CAST(single_thread_score as REAL) / CAST(price as REAL)",
            "single_pp",
          )
          .orderBy("single_pp", "DESC", "NULLS LAST");
      } else if (type === "gpu" && values.sort === "price_performance_desc") {
        queryBuilder = queryBuilder
          .addSelect("CAST(score as REAL) / CAST(price as REAL)", "pp")
          .orderBy("pp", "DESC", "NULLS LAST");
      }

      const productList = (await queryBuilder.getMany()) as productInfo[];

      setConvertedProducts(productList);
    }

    close();
  }

  let sortData = [
    { value: "sales_rank_asc", label: "売上順" },
    { value: "price_asc", label: "価格順" },
  ];
  if (type === "cpu") {
    sortData = [
      { value: "sales_rank_asc", label: "売上順" },
      { value: "price_asc", label: "価格順" },
      {
        value: "multi_thread_price_performance_desc",
        label: "コストパフォーマンス順（マルチスレッド）",
      },
      {
        value: "single_thread_price_performance_desc",
        label: "コストパフォーマンス順（シングルスレッド）",
      },
    ];
  } else if (type === "gpu") {
    sortData = [
      { value: "sales_rank_asc", label: "売上順" },
      { value: "price_asc", label: "価格順" },
      {
        value: "price_performance_desc",
        label: "コストパフォーマンス順",
      },
    ];
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="オプション"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <Select
            data={sortData}
            allowDeselect={false}
            key={form.key("sort")}
            {...form.getInputProps("sort")}
          />

          <TextInput
            placeholder="キーワード"
            rightSection={
              <Input.ClearButton
                onClick={() => form.setValues({ keyword: "" })}
              />
            }
            rightSectionPointerEvents="auto"
            key={form.key("keyword")}
            {...form.getInputProps("keyword")}
          />

          <Flex gap="md">
            <NumberInput
              style={{ flexGrow: 1 }}
              placeholder="以上"
              leftSection="￥"
              rightSection={
                <Input.ClearButton
                  onClick={() => form.setValues({ min: "" })}
                />
              }
              rightSectionPointerEvents="auto"
              allowNegative={false}
              allowDecimal={false}
              key={form.key("min")}
              {...form.getInputProps("min")}
            />
            <Text pt="5px" style={{ flexGrow: 0 }}>
              ～
            </Text>
            <NumberInput
              style={{ flexGrow: 1 }}
              placeholder="以下"
              leftSection="￥"
              rightSection={
                <Input.ClearButton
                  onClick={() => form.setValues({ max: "" })}
                />
              }
              rightSectionPointerEvents="auto"
              allowNegative={false}
              allowDecimal={false}
              key={form.key("max")}
              {...form.getInputProps("max")}
            />
          </Flex>

          <Accordions type={type} form={form} />
        </Stack>

        <Group justify="flex-end" mt="md">
          <Button type="submit">適用</Button>
        </Group>
      </form>
    </Modal>
  );
}
