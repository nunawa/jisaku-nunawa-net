import cpuJson from "@/json/cpu.json";
import gpuJson from "@/json/gpu.json";
import memoryJson from "@/json/memory.json";
import motherboardJson from "@/json/motherboard.json";
import ssdJson from "@/json/ssd.json";
import psuJson from "@/json/psu.json";
import { productType } from "@/types";
import { Accordion, Form, Stack } from "react-bootstrap";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { formatKb } from "@/utils/formatKb";

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

  const memoryCapacityListLengthHalf = Math.floor(
    memoryCapacityList.length / 2,
  );

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>容量</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {memoryCapacityList.map((value, index) => {
                if (index <= memoryCapacityListLengthHalf) {
                  return (
                    <Form.Check
                      key={value}
                      id={`memory-capacity-${index}`}
                      label={formatKb(value)}
                      {...register(`memory.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {memoryCapacityList.map((value, index) => {
                if (index > memoryCapacityListLengthHalf) {
                  return (
                    <Form.Check
                      key={value}
                      id={`memory-capacity-${index}`}
                      label={formatKb(value)}
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

  const gpuCapacityListLengthHalf = Math.floor(gpuCapacityList.length / 2);

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
                if (index <= gpuCapacityListLengthHalf) {
                  return (
                    <Form.Check
                      key={value}
                      id={`gpu-capacity-${index}`}
                      label={formatKb(value)}
                      {...register(`gpu.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {gpuCapacityList.map((value, index) => {
                if (index > gpuCapacityListLengthHalf) {
                  return (
                    <Form.Check
                      key={value}
                      id={`gpu-capacity-${index}`}
                      label={formatKb(value)}
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

  const ssdCapacityListLengthHalf = Math.floor(ssdCapacityList.length / 2);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>容量</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {ssdCapacityList.map((value, index) => {
                if (index <= ssdCapacityListLengthHalf) {
                  return (
                    <Form.Check
                      key={value}
                      id={`ssd-capacity-${index}`}
                      label={formatKb(value)}
                      {...register(`ssd.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {ssdCapacityList.map((value, index) => {
                if (index > ssdCapacityListLengthHalf) {
                  return (
                    <Form.Check
                      key={value}
                      id={`ssd-capacity-${index}`}
                      label={formatKb(value)}
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

function PsuAccordion(register: UseFormRegister<FieldValues>) {
  const psuCapacityList = psuJson.capacity;
  const psuCertificationList = psuJson.certification;

  const psuCapacityListLengthHalf = Math.floor(psuCapacityList.length / 3);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>容量</Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" gap={2}>
            <div className="p-2">
              {psuCapacityList.map((value, index) => {
                if (index <= psuCapacityListLengthHalf) {
                  return (
                    <Form.Check
                      key={value}
                      id={`psu-capacity-${value}`}
                      label={value}
                      {...register(`psu.capacity.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {psuCapacityList.map((value, index) => {
                if (
                  index > psuCapacityListLengthHalf &&
                  index <= psuCapacityListLengthHalf * 2
                ) {
                  return (
                    <Form.Check
                      key={value}
                      id={`psu-capacity-${value}`}
                      label={value}
                      {...register(`psu.capacity.${value}`)}
                    />
                  );
                }
              })}
            </div>
            <div className="p-2">
              {psuCapacityList.map((value, index) => {
                if (index > psuCapacityListLengthHalf * 2) {
                  return (
                    <Form.Check
                      key={value}
                      id={`psu-capacity-${value}`}
                      label={value}
                      {...register(`psu.capacity.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>認証</Accordion.Header>
        <Accordion.Body>
          {psuCertificationList.map((value, index) => (
            <Form.Check
              key={value}
              id={`psu-certification-${index}`}
              label={value}
              {...register(`psu.certification.${index}.${value}`)}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function CaseAccordion(register: UseFormRegister<FieldValues>) {
  return (
    <Accordion>
      <Accordion.Item eventKey="2">
        <Accordion.Header>付属電源</Accordion.Header>
        <Accordion.Body>
          <Form.Check
            key="psuIncluded.yes"
            id={"case-psu-included-yes"}
            label="あり"
            {...register("case.psuIncluded.yes")}
          />
          <Form.Check
            key="psuIncluded.no"
            id={"case-psu-included-no"}
            label="なし"
            {...register("case.psuIncluded.no")}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default function Accordions({
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
    case "psu":
      return PsuAccordion(register);
    case "case":
      return CaseAccordion(register);
  }
}
