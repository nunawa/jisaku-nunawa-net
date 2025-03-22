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
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction } from "react";
import { Brackets, DataSource, SelectQueryBuilder } from "typeorm";
import Accordions from "./Accordions";

function addCpuQuery(
  queryBuilder: SelectQueryBuilder<Cpu>,
  values: cpuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.coreCount)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`core_count = :coreCount${suffix}`, {
            [`coreCount${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.socket)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`socket = :socket${suffix}`, {
            [`socket${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

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

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.capacity)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`capacity = :capacity${suffix}`, {
            [`capacity${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.pcs)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`pcs = :pcs${suffix}`, {
            [`pcs${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.standard)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`standard = :standard${suffix}`, {
            [`standard${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.interface)) {
        if (isSelected === true) {
          const restoredKey = key.replaceAll("_", ".");
          resultQb = resultQb.orWhere(`interface = :interface${suffix}`, {
            [`interface${suffix}`]: restoredKey,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

function addMotherboardQuery(
  queryBuilder: SelectQueryBuilder<Motherboard>,
  values: motherboardFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.formFactor)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`form_factor = :formFactor${suffix}`, {
            [`formFactor${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.socket)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`socket = :socket${suffix}`, {
            [`socket${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.chipset)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`chipset = :chipset${suffix}`, {
            [`chipset${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.memory)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`memory = :memory${suffix}`, {
            [`memory${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

function addGpuQuery(
  queryBuilder: SelectQueryBuilder<Gpu>,
  values: gpuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.gpuName)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`gpu_name = :gpuName${suffix}`, {
            [`gpuName${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.busInterface)) {
        if (isSelected === true) {
          const restoredKey = key.replaceAll("_", ".");
          resultQb = resultQb.orWhere(
            `bus_interface = :busInterface${suffix}`,
            {
              [`busInterface${suffix}`]: restoredKey,
            },
          );
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.standard)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`standard = :standard${suffix}`, {
            [`standard${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.capacity)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`capacity = :capacity${suffix}`, {
            [`capacity${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

function addSsdQuery(
  queryBuilder: SelectQueryBuilder<Ssd>,
  values: ssdFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.capacity)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`capacity = :capacity${suffix}`, {
            [`capacity${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.size)) {
        if (isSelected === true) {
          const restoredKey = key.replaceAll("_", ".");
          resultQb = resultQb.orWhere(`size = :size${suffix}`, {
            [`size${suffix}`]: restoredKey,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.interface)) {
        if (isSelected === true) {
          const restoredKey = key.replaceAll("_", ".");
          resultQb = resultQb.orWhere(`interface = :interface${suffix}`, {
            [`interface${suffix}`]: restoredKey,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

function addPsuQuery(
  queryBuilder: SelectQueryBuilder<Psu>,
  values: psuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.capacity)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`capacity = :capacity${suffix}`, {
            [`capacity${suffix}`]: key,
          });
          suffix++;
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      let suffix = 0;
      for (const [key, isSelected] of Object.entries(values.certification)) {
        if (isSelected === true) {
          resultQb = resultQb.orWhere(
            `certification = :certification${suffix}`,
            {
              [`certification${suffix}`]: key,
            },
          );
          suffix++;
        }
      }

      return resultQb;
    }),
  );

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
  type: keyof productType;
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
      }

      const productList = (await queryBuilder.getMany()) as productInfo[];

      setConvertedProducts(productList);
    }

    close();
  }

  return (
    <Modal opened={opened} onClose={close} title="オプション">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <Select
            data={[
              { value: "sales_rank_asc", label: "売上順" },
              { value: "price_asc", label: "価格順" },
            ]}
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
