import { Cpu } from "@/db/Cpu";
import { Gpu } from "@/db/Gpu";
import { Memory } from "@/db/Memory";
import { Motherboard } from "@/db/Motherboard";
import { Psu } from "@/db/Psu";
import { Ssd } from "@/db/Ssd";
import {
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
import { Dispatch, SetStateAction } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Brackets, DataSource, SelectQueryBuilder } from "typeorm";
import Accordions from "./Accordions";

function addCpuQuery(
  queryBuilder: SelectQueryBuilder<Cpu>,
  value: cpuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.coreCount.length; i++) {
        if (value.coreCount[i] === true) {
          resultQb = resultQb.orWhere(`core_count = :coreCount${i}`, {
            [`coreCount${i}`]: i,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.socket.length; i++) {
        const option = value.socket[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`socket = :socket${i}`, {
            [`socket${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  if (value.igpu.yes === true && value.igpu.no === false) {
    resultQueryBuilder = resultQueryBuilder.andWhere("gpu IS NOT NULL");
  } else if (value.igpu.yes === false && value.igpu.no === true) {
    resultQueryBuilder = resultQueryBuilder.andWhere("gpu IS NULL");
  }

  return resultQueryBuilder;
}

function addMemoryQuery(
  queryBuilder: SelectQueryBuilder<Memory>,
  value: memoryFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.capacity.length; i++) {
        const option = value.capacity[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`capacity = :capacity${i}`, {
            [`capacity${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.pcs.length; i++) {
        if (value.pcs[i] === true) {
          resultQb = resultQb.orWhere(`pcs = :pcs${i}`, { [`pcs${i}`]: i });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.standard.length; i++) {
        const option = value.standard[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`standard = :standard${i}`, {
            [`standard${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.interface.length; i++) {
        const option = value.interface[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          const restoredKey = key.replaceAll("_", ".");
          resultQb = resultQb.orWhere(`interface = :interface${i}`, {
            [`interface${i}`]: restoredKey,
          });
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

function addMotherboardQuery(
  queryBuilder: SelectQueryBuilder<Motherboard>,
  value: motherboardFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.formFactor.length; i++) {
        const formFactorOption = value.formFactor[i];
        const [key, isSelected] = Object.entries(formFactorOption)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`form_factor = :formFactor${i}`, {
            [`formFactor${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.socket.length; i++) {
        const option = value.socket[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`socket = :socket${i}`, {
            [`socket${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.chipset.length; i++) {
        const option = value.chipset[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`chipset = :chipset${i}`, {
            [`chipset${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.memory.length; i++) {
        const option = value.memory[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          const restoredKey = key.replaceAll("_", ".");
          resultQb = resultQb.orWhere(`memory = :memory${i}`, {
            [`memory${i}`]: restoredKey,
          });
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

function addGpuQuery(
  queryBuilder: SelectQueryBuilder<Gpu>,
  value: gpuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.gpuName.length; i++) {
        const gpuNameOption = value.gpuName[i];
        const [key, isSelected] = Object.entries(gpuNameOption)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`gpu_name = :gpuName${i}`, {
            [`gpuName${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.busInterface.length; i++) {
        const busInterfaceOption = value.busInterface[i];
        const [key, isSelected] = Object.entries(busInterfaceOption)[0];
        if (isSelected === true) {
          const restoredKey = key.replaceAll("_", ".");
          resultQb = resultQb.orWhere(`bus_interface = :busInterface${i}`, {
            [`busInterface${i}`]: restoredKey,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.standard.length; i++) {
        const option = value.standard[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`standard = :standard${i}`, {
            [`standard${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.capacity.length; i++) {
        const option = value.capacity[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`capacity = :capacity${i}`, {
            [`capacity${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

function addSsdQuery(
  queryBuilder: SelectQueryBuilder<Ssd>,
  value: ssdFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.capacity.length; i++) {
        const option = value.capacity[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`capacity = :capacity${i}`, {
            [`capacity${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.size.length; i++) {
        const option = value.size[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          const restoredKey = key.replaceAll("_", ".");
          resultQb = resultQb.orWhere(`size = :size${i}`, {
            [`size${i}`]: restoredKey,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.interface.length; i++) {
        const option = value.interface[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`interface = :interface${i}`, {
            [`interface${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

function addPsuQuery(
  queryBuilder: SelectQueryBuilder<Psu>,
  value: psuFilterOption,
) {
  let resultQueryBuilder = queryBuilder;

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.capacity.length; i++) {
        if (value.capacity[i] === true) {
          resultQb = resultQb.orWhere(`capacity = :capacity${i}`, {
            [`capacity${i}`]: i,
          });
        }
      }

      return resultQb;
    }),
  );

  resultQueryBuilder = resultQueryBuilder.andWhere(
    new Brackets((qb) => {
      let resultQb = qb;

      for (let i = 0; i < value.certification.length; i++) {
        const option = value.certification[i];
        const [key, isSelected] = Object.entries(option)[0];
        if (isSelected === true) {
          resultQb = resultQb.orWhere(`certification = :certification${i}`, {
            [`certification${i}`]: key,
          });
        }
      }

      return resultQb;
    }),
  );

  return resultQueryBuilder;
}

export default function FilterOption({
  show,
  handleClose,
  type,
  dataSource,
  setConvertedProducts,
  submittedFilterOption,
  setSubmittedFilterOption,
}: {
  show: boolean;
  handleClose: () => void;
  type: keyof productType;
  dataSource: DataSource | undefined;
  setConvertedProducts: Dispatch<SetStateAction<productInfo[] | undefined>>;
  submittedFilterOption: filterOptions;
  setSubmittedFilterOption: Dispatch<SetStateAction<filterOptions>>;
}) {
  const { register, handleSubmit, resetField, setValue } = useForm();

  async function onSubmit(data: filterOptions) {
    setSubmittedFilterOption(data);

    if (dataSource) {
      let queryBuilder:
        | SelectQueryBuilder<Cpu>
        | SelectQueryBuilder<Memory>
        | SelectQueryBuilder<Motherboard>
        | SelectQueryBuilder<Gpu>
        | SelectQueryBuilder<Ssd>
        | SelectQueryBuilder<Psu>;

      switch (type) {
        case "cpu":
          queryBuilder = dataSource.getRepository(Cpu).createQueryBuilder(type);

          if (data.cpu) {
            queryBuilder = addCpuQuery(queryBuilder, data.cpu);
          }

          break;
        case "memory":
          queryBuilder = dataSource
            .getRepository(Memory)
            .createQueryBuilder(type);

          if (data.memory) {
            queryBuilder = addMemoryQuery(queryBuilder, data.memory);
          }

          break;
        case "motherboard":
          queryBuilder = dataSource
            .getRepository(Motherboard)
            .createQueryBuilder(type);

          if (data.motherboard) {
            queryBuilder = addMotherboardQuery(queryBuilder, data.motherboard);
          }

          break;
        case "gpu":
          queryBuilder = dataSource.getRepository(Gpu).createQueryBuilder(type);

          if (data.gpu) {
            queryBuilder = addGpuQuery(queryBuilder, data.gpu);
          }

          break;
        case "ssd":
          queryBuilder = dataSource.getRepository(Ssd).createQueryBuilder(type);

          if (data.ssd) {
            queryBuilder = addSsdQuery(queryBuilder, data.ssd);
          }

          break;
        case "psu":
          queryBuilder = dataSource.getRepository(Psu).createQueryBuilder(type);

          if (data.psu) {
            queryBuilder = addPsuQuery(queryBuilder, data.psu);
          }

          break;
      }

      if (data.keyword) {
        queryBuilder = queryBuilder.andWhere(
          "concat(manufacturer, ' ', name) LIKE :keyword",
          { keyword: `%${data.keyword}%` },
        );
      }

      const min = Number(data.min);
      const max = Number(data.max);
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

      if (data.sort == "sales_rank_asc") {
        queryBuilder = queryBuilder.orderBy(
          "sales_rank",
          undefined,
          "NULLS LAST",
        );
      } else if (data.sort == "price_asc") {
        queryBuilder = queryBuilder.orderBy("price", undefined, "NULLS LAST");
      }

      const productList = (await queryBuilder.getMany()) as productInfo[];

      setConvertedProducts(productList);
    }

    handleClose();
  }

  function onHide() {
    setValue("sort", submittedFilterOption.sort);
    setValue("keyword", submittedFilterOption.keyword);
    setValue("min", submittedFilterOption.min);
    setValue("max", submittedFilterOption.max);
    if (submittedFilterOption.cpu) {
      setValue("cpu.coreCount", submittedFilterOption.cpu.coreCount);
      setValue("cpu.socket", submittedFilterOption.cpu.socket);
      setValue("cpu.igpu.yes", submittedFilterOption.cpu.igpu.yes);
      setValue("cpu.igpu.no", submittedFilterOption.cpu.igpu.no);
    }
    if (submittedFilterOption.memory) {
      setValue("memory.capacity", submittedFilterOption.memory.capacity);
      setValue("memory.pcs", submittedFilterOption.memory.pcs);
      setValue("memory.standard", submittedFilterOption.memory.standard);
      setValue("memory.interface", submittedFilterOption.memory.interface);
    }
    if (submittedFilterOption.motherboard) {
      setValue(
        "motherboard.formFactor",
        submittedFilterOption.motherboard.formFactor,
      );
      setValue("motherboard.socket", submittedFilterOption.motherboard.socket);
      setValue(
        "motherboard.chipset",
        submittedFilterOption.motherboard.chipset,
      );
      setValue("motherboard.memory", submittedFilterOption.motherboard.memory);
    }
    if (submittedFilterOption.gpu) {
      setValue("gpu.gpuName", submittedFilterOption.gpu.gpuName);
      setValue("gpu.busInterface", submittedFilterOption.gpu.busInterface);
      setValue("gpu.standard", submittedFilterOption.gpu.standard);
      setValue("gpu.capacity", submittedFilterOption.gpu.capacity);
    }
    if (submittedFilterOption.ssd) {
      setValue("ssd.capacity", submittedFilterOption.ssd.capacity);
      setValue("ssd.size", submittedFilterOption.ssd.size);
      setValue("ssd.interface", submittedFilterOption.ssd.interface);
    }
    if (submittedFilterOption.psu) {
      setValue("psu.capacity", submittedFilterOption.psu.capacity);
      setValue("psu.certification", submittedFilterOption.psu.certification);
    }

    handleClose();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
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
          <Accordions type={type} register={register} />
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
