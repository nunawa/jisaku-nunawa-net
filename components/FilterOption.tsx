import cpuJson from "@/json/cpu.json";
import gpuJson from "@/json/gpu.json";
import memoryJson from "@/json/memory.json";
import motherboardJson from "@/json/motherboard.json";
import ssdJson from "@/json/ssd.json";
import {
  cpuFilterOption,
  filterOptions,
  gpuFilterOption,
  memoryFilterOption,
  motherboardFilterOption,
  productInfo,
  productType,
  ssdFilterOption,
} from "@/types";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  Button,
  Form,
  InputGroup,
  Modal,
  Stack,
} from "react-bootstrap";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { SqlJsStatic, Database } from "sql.js";

function CpuAccordion(register: UseFormRegister<FieldValues>) {
  const coreCountList = cpuJson.core_count;
  const cpuSocketList = cpuJson.socket;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>コア数</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              {coreCountList.map((value, index) => {
                if (index < 7) {
                  return (
                    <Form.Check
                      key={value}
                      id={`cpu-core-count-${value}`}
                      label={value}
                      {...register(`cpu.coreCount.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {coreCountList.map((value, index) => {
                if (index >= 7 && index < 14) {
                  return (
                    <Form.Check
                      key={value}
                      id={`cpu-core-count-${value}`}
                      label={value}
                      {...register(`cpu.coreCount.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {coreCountList.map((value, index) => {
                if (index >= 14) {
                  return (
                    <Form.Check
                      key={value}
                      id={`cpu-core-count-${value}`}
                      label={value}
                      {...register(`cpu.coreCount.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>ソケット</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              {cpuSocketList.map((value, index) => {
                if (index < 10) {
                  return (
                    <Form.Check
                      key={value}
                      id={`cpu-socket-${index}`}
                      label={value}
                      {...register(`cpu.socket.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {cpuSocketList.map((value, index) => {
                if (index >= 10) {
                  return (
                    <Form.Check
                      key={value}
                      id={`cpu-socket-${index}`}
                      label={value}
                      {...register(`cpu.socket.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>内蔵GPU</Accordion.Header>
        <Accordion.Body>
          <Form.Check
            key="igpu.yes"
            id={"cpu-igpu-yes"}
            label="あり"
            {...register("cpu.igpu.yes")}
          />
          <Form.Check
            key="igpu.no"
            id={"cpu-igpu-no"}
            label="なし"
            {...register("cpu.igpu.no")}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function MemoryAccordion(register: UseFormRegister<FieldValues>) {
  const memoryCapacityList = memoryJson.capacity;
  const pcsList = memoryJson.pcs;
  const memoryStandardList = memoryJson.standard;
  const memoryInterfaceList = memoryJson.interface;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>容量</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {memoryCapacityList.map((value, index) => {
                if (index < 8) {
                  return (
                    <Form.Check
                      key={value}
                      id={`memory-capacity-${index}`}
                      label={value}
                      {...register(`memory.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {memoryCapacityList.map((value, index) => {
                if (index >= 8) {
                  return (
                    <Form.Check
                      key={value}
                      id={`memory-capacity-${index}`}
                      label={value}
                      {...register(`memory.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>枚数</Accordion.Header>
        <Accordion.Body>
          {pcsList.map((value) => (
            <Form.Check
              key={value}
              id={`memory-pcs-${value}`}
              label={value}
              {...register(`memory.pcs.${value}`)}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>規格</Accordion.Header>
        <Accordion.Body>
          {memoryStandardList.map((value, index) => (
            <Form.Check
              key={value}
              id={`memory-standard-${index}`}
              label={value}
              {...register(`memory.standard.${index}.${value}`)}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>インターフェース</Accordion.Header>
        <Accordion.Body>
          {memoryInterfaceList.map((value, index) => {
            const escapedValue = value.replaceAll(".", "_");
            return (
              <Form.Check
                key={value}
                id={`memory-interface-${index}`}
                label={value}
                {...register(`memory.interface.${index}.${escapedValue}`)}
              />
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function MotherboardAccordion(register: UseFormRegister<FieldValues>) {
  const formFactorList = motherboardJson.form_factor;
  const motherboardSocketList = motherboardJson.socket;
  const chipsetList = motherboardJson.chipset;
  const motherboardMemoryList = motherboardJson.memory;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>フォームファクタ</Accordion.Header>
        <Accordion.Body>
          {formFactorList.map((value, index) => (
            <Form.Check
              key={value}
              id={`motherboard-form-factor-${index}`}
              label={value}
              {...register(`motherboard.formFactor.${index}.${value}`)}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>ソケット</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {motherboardSocketList.map((value, index) => {
                if (index < 7) {
                  return (
                    <Form.Check
                      key={value}
                      id={`motherboard-socket-${index}`}
                      label={value}
                      {...register(`motherboard.socket.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {motherboardSocketList.map((value, index) => {
                if (index >= 7) {
                  return (
                    <Form.Check
                      key={value}
                      id={`motherboard-socket-${index}`}
                      label={value}
                      {...register(`motherboard.socket.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>チップセット</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {chipsetList.map((value, index) => {
                if (index < 28) {
                  return (
                    <Form.Check
                      key={value}
                      id={`motherboard-chipset-${index}`}
                      label={value}
                      {...register(`motherboard.chipset.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {chipsetList.map((value, index) => {
                if (index >= 28) {
                  return (
                    <Form.Check
                      key={value}
                      id={`motherboard-chipset-${index}`}
                      label={value}
                      {...register(`motherboard.chipset.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>メモリ</Accordion.Header>
        <Accordion.Body>
          {motherboardMemoryList.map((value, index) => {
            const escapedValue = value.replaceAll(".", "_");
            return (
              <Form.Check
                key={value}
                id={`motherboard-memory-${index}`}
                label={value}
                {...register(`motherboard.memory.${index}.${escapedValue}`)}
              />
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function GpuAccordion(register: UseFormRegister<FieldValues>) {
  const gpuNameList = gpuJson.gpu_name;
  const busList = gpuJson.bus_interface;
  const gpuStandardList = gpuJson.standard;
  const gpuCapacityList = gpuJson.capacity;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>GPU</Accordion.Header>
        <Accordion.Body>
          {gpuNameList.map((value, index) => (
            <Form.Check
              key={value}
              id={`gpu-gpu-name-${index}`}
              label={value}
              {...register(`gpu.gpuName.${index}.${value}`)}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>バスインターフェース</Accordion.Header>
        <Accordion.Body>
          {busList.map((value, index) => {
            const escapedValue = value.replaceAll(".", "_");
            return (
              <Form.Check
                key={value}
                id={`gpu-bus-interface-${index}`}
                label={value}
                {...register(`gpu.busInterface.${index}.${escapedValue}`)}
              />
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>規格</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {gpuStandardList.map((value, index) => {
                if (index < 5) {
                  return (
                    <Form.Check
                      key={value}
                      id={`gpu-standard-${index}`}
                      label={value}
                      {...register(`gpu.standard.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {gpuStandardList.map((value, index) => {
                if (index >= 5) {
                  return (
                    <Form.Check
                      key={value}
                      id={`gpu-standard-${index}`}
                      label={value}
                      {...register(`gpu.standard.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>容量</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {gpuCapacityList.map((value, index) => {
                if (index < 10) {
                  return (
                    <Form.Check
                      key={value}
                      id={`gpu-capacity-${index}`}
                      label={value}
                      {...register(`gpu.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {gpuCapacityList.map((value, index) => {
                if (index >= 10) {
                  return (
                    <Form.Check
                      key={value}
                      id={`gpu-capacity-${index}`}
                      label={value}
                      {...register(`gpu.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function SsdAccordion(register: UseFormRegister<FieldValues>) {
  const ssdCapacityList = ssdJson.capacity;
  const sizeList = ssdJson.size;
  const ssdInterfaceList = ssdJson.interface;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>容量</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {ssdCapacityList.map((value, index) => {
                if (index < 19) {
                  return (
                    <Form.Check
                      key={value}
                      id={`ssd-capacity-${index}`}
                      label={value}
                      {...register(`ssd.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {ssdCapacityList.map((value, index) => {
                if (index >= 19) {
                  return (
                    <Form.Check
                      key={value}
                      id={`ssd-capacity-${index}`}
                      label={value}
                      {...register(`ssd.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>サイズ</Accordion.Header>
        <Accordion.Body>
          {sizeList.map((value, index) => {
            const escapedValue = value.replace(".", "_");
            return (
              <Form.Check
                key={value}
                id={`ssd-size-${index}`}
                label={value}
                {...register(`ssd.size.${index}.${escapedValue}`)}
              />
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>インターフェース</Accordion.Header>
        <Accordion.Body>
          {ssdInterfaceList.map((value, index) => (
            <Form.Check
              key={value}
              id={`ssd-interface-${index}`}
              label={value}
              {...register(`ssd.interface.${index}.${value}`)}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function Accordions({
  type,
  register,
}: {
  type: keyof productType;
  register: UseFormRegister<FieldValues>;
}) {
  switch (type) {
    case "cpu":
      return CpuAccordion(register);
    case "memory":
      return MemoryAccordion(register);
    case "motherboard":
      return MotherboardAccordion(register);
    case "gpu":
      return GpuAccordion(register);
    case "ssd":
      return SsdAccordion(register);
  }
}

export default function FilterOption({
  show,
  handleClose,
  type,
  buf,
  sql,
  setConvertedProducts,
  submittedFilterOption,
  setSubmittedFilterOption,
}: {
  show: boolean;
  handleClose: () => void;
  type: keyof productType;
  buf: ArrayBuffer;
  sql: SqlJsStatic;
  setConvertedProducts: Dispatch<SetStateAction<productInfo[] | undefined>>;
  submittedFilterOption: filterOptions;
  setSubmittedFilterOption: Dispatch<SetStateAction<filterOptions>>;
}) {
  const { register, handleSubmit, resetField, setValue } = useForm();

  let db = null;

  if (buf && sql) {
    db = new sql.Database(new Uint8Array(buf));
  }

  function onSubmit(data: filterOptions) {
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
      minMax = `(price >= ${min} AND price <= ${max})`;
    } else if (min) {
      minMax = `price >= ${min}`;
    } else if (max) {
      minMax = `price <= ${max}`;
    }

    let coreCount = "";
    let cpuSocket = "";
    let igpu = "";
    if (data.cpu) {
      let filteredCoreCount = [];
      for (let i = 0; i < data.cpu.coreCount.length; i++) {
        if (data.cpu.coreCount[i] === true) {
          filteredCoreCount.push(`core_count = ${i}`);
        }
      }
      coreCount = filteredCoreCount.join(" OR ");

      let filteredCpuSocket = [];
      for (const iter of data.cpu.socket) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredCpuSocket.push(`socket = "${key}"`);
          }
        }
      }
      cpuSocket = filteredCpuSocket.join(" OR ");

      if (
        (data.cpu.igpu.yes === true && data.cpu.igpu.no === true) ||
        (data.cpu.igpu.yes === false && data.cpu.igpu.no === false)
      ) {
        igpu = "";
      } else if (data.cpu.igpu.yes === true) {
        igpu = "gpu IS NOT NULL";
      } else if (data.cpu.igpu.no === true) {
        igpu = "gpu IS NULL";
      }
    }

    let memoryCapacity = "";
    let pcs = "";
    let memoryStandard = "";
    let memoryInterface = "";
    if (data.memory) {
      let filteredCapacity = [];
      for (const iter of data.memory.capacity) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredCapacity.push(`capacity = "${key}"`);
          }
        }
      }
      memoryCapacity = filteredCapacity.join(" OR ");

      let filteredPcs = [];
      for (let i = 0; i < data.memory.pcs.length; i++) {
        if (data.memory.pcs[i] === true) {
          filteredPcs.push(`pcs = ${i}`);
        }
      }
      pcs = filteredPcs.join(" OR ");

      let filteredStandard = [];
      for (const iter of data.memory.standard) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredStandard.push(`standard = "${key}"`);
          }
        }
      }
      memoryStandard = filteredStandard.join(" OR ");

      let filteredMemoryInterface = [];
      for (const iter of data.memory.interface) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            const restoredKey = key.replaceAll("_", ".");
            filteredMemoryInterface.push(`interface = "${restoredKey}"`);
          }
        }
      }
      memoryInterface = filteredMemoryInterface.join(" OR ");
    }

    let formFactor = "";
    let motherboardSocket = "";
    let chipset = "";
    let motherboardMemory = "";
    if (data.motherboard) {
      let filteredFormFactor = [];
      for (const iter of data.motherboard.formFactor) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredFormFactor.push(`form_factor = "${key}"`);
          }
        }
      }
      formFactor = filteredFormFactor.join(" OR ");

      let filteredMotherboardSocket = [];
      for (const iter of data.motherboard.socket) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredMotherboardSocket.push(`socket = "${key}"`);
          }
        }
      }
      motherboardSocket = filteredMotherboardSocket.join(" OR ");

      let filteredChipset = [];
      for (const iter of data.motherboard.chipset) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredChipset.push(`chipset = "${key}"`);
          }
        }
      }
      chipset = filteredChipset.join(" OR ");

      let filteredMemory = [];
      for (const iter of data.motherboard.memory) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredMemory.push(`memory = "${key}"`);
          }
        }
      }
      motherboardMemory = filteredMemory.join(" OR ");
    }

    let gpuName = "";
    let busInterface = "";
    let gpuStandard = "";
    let gpuCapacity = "";
    if (data.gpu) {
      let filteredGpuName = [];
      for (const iter of data.gpu.gpuName) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredGpuName.push(`gpu_name = "${key}"`);
          }
        }
      }
      gpuName = filteredGpuName.join(" OR ");

      let filteredBusInterface = [];
      for (const iter of data.gpu.busInterface) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            const restoredKey = key.replaceAll("_", ".");
            filteredBusInterface.push(`bus_interface = "${restoredKey}"`);
          }
        }
      }
      busInterface = filteredBusInterface.join(" OR ");

      let filteredGpuStandard = [];
      for (const iter of data.gpu.standard) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredGpuStandard.push(`standard = "${key}"`);
          }
        }
      }
      gpuStandard = filteredGpuStandard.join(" OR ");

      let filteredGpuCapacity = [];
      for (const iter of data.gpu.capacity) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredGpuCapacity.push(`capacity = "${key}"`);
          }
        }
      }
      gpuCapacity = filteredGpuCapacity.join(" OR ");
    }

    let ssdCapacity = "";
    let size = "";
    let ssdInterface = "";
    if (data.ssd) {
      let filteredSsdCapacity = [];
      for (const iter of data.ssd.capacity) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredSsdCapacity.push(`capacity = "${key}"`);
          }
        }
      }
      ssdCapacity = filteredSsdCapacity.join(" OR ");

      let filteredSize = [];
      for (const iter of data.ssd.size) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            const restoredKey = key.replaceAll("_", ".");
            filteredSize.push(`size = "${restoredKey}"`);
          }
        }
      }
      size = filteredSize.join(" OR ");

      let filteredSsdInterface = [];
      for (const iter of data.ssd.interface) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredSsdInterface.push(`interface = "${key}"`);
          }
        }
      }
      ssdInterface = filteredSsdInterface.join(" OR ");
    }

    let where = "";
    if (
      keyword ||
      minMax ||
      coreCount ||
      cpuSocket ||
      igpu ||
      memoryCapacity ||
      pcs ||
      memoryStandard ||
      memoryInterface ||
      formFactor ||
      motherboardSocket ||
      chipset ||
      motherboardMemory ||
      gpuName ||
      busInterface ||
      gpuStandard ||
      gpuCapacity ||
      ssdCapacity ||
      size ||
      ssdInterface
    ) {
      const params = [
        keyword,
        minMax,
        coreCount,
        cpuSocket,
        igpu,
        memoryCapacity,
        pcs,
        memoryStandard,
        memoryInterface,
        formFactor,
        motherboardSocket,
        chipset,
        motherboardMemory,
        gpuName,
        busInterface,
        gpuStandard,
        gpuCapacity,
        ssdCapacity,
        size,
        ssdInterface,
      ]
        .filter(Boolean)
        .join(") AND (");
      where = `WHERE (${params})`;
    }

    if (buf && sql) {
      const db = new sql.Database(new Uint8Array(buf));
      let productList: SetStateAction<productInfo[] | undefined> = [];
      db.each(
        `SELECT * FROM ${type} ${where} ${sort} LIMIT 30`,
        (row) => {
          productList.push(row as productInfo);
        },
        () => {},
      );
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
