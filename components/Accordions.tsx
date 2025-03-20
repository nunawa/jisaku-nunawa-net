import cpuJson from "@/json/cpu.json";
import gpuJson from "@/json/gpu.json";
import memoryJson from "@/json/memory.json";
import motherboardJson from "@/json/motherboard.json";
import psuJson from "@/json/psu.json";
import ssdJson from "@/json/ssd.json";
import { productType } from "@/types";
import { formatKb } from "@/utils/formatKb";
import { Accordion, Checkbox, Group } from "@mantine/core";
import { FieldValues, UseFormRegister } from "react-hook-form";

function CpuAccordion(register: UseFormRegister<FieldValues>) {
  const coreCountList = cpuJson.core_count;
  const cpuSocketList = cpuJson.socket;

  return (
    <Accordion>
      <Accordion.Item key="cpu-core-count" value="cpu-core-count">
        <Accordion.Control>コア数</Accordion.Control>
        <Accordion.Panel>
          <Group gap={3}>
            <div className="p-2">
              {coreCountList.map((value, index) => {
                if (index < 7) {
                  return (
                    <Checkbox
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
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`cpu-core-count-${value}`}
                      label={value}
                      {...register(`cpu.coreCount.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="cpu-socket" value="cpu-socket">
        <Accordion.Control>ソケット</Accordion.Control>
        <Accordion.Panel>
          <Group gap={3}>
            <div className="p-2">
              {cpuSocketList.map((value, index) => {
                if (index < 10) {
                  return (
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`cpu-socket-${index}`}
                      label={value}
                      {...register(`cpu.socket.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="cpu-igpu" value="cpu-igpu">
        <Accordion.Control>内蔵GPU</Accordion.Control>
        <Accordion.Panel>
          <Checkbox
            key="igpu.yes"
            id={"cpu-igpu-yes"}
            label="あり"
            {...register("cpu.igpu.yes")}
          />
          <Checkbox
            key="igpu.no"
            id={"cpu-igpu-no"}
            label="なし"
            {...register("cpu.igpu.no")}
          />
        </Accordion.Panel>
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
      <Accordion.Item key="memory-capacity" value="memory-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group gap={2}>
            <div className="p-2">
              {memoryCapacityList.map((value, index) => {
                if (index <= memoryCapacityListLengthHalf) {
                  return (
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`memory-capacity-${index}`}
                      label={formatKb(value)}
                      {...register(`memory.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-pcs" value="memory-pcs">
        <Accordion.Control>枚数</Accordion.Control>
        <Accordion.Panel>
          {pcsList.map((value) => (
            <Checkbox
              key={value}
              id={`memory-pcs-${value}`}
              label={value}
              {...register(`memory.pcs.${value}`)}
            />
          ))}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-standard" value="memory-standard">
        <Accordion.Control>規格</Accordion.Control>
        <Accordion.Panel>
          {memoryStandardList.map((value, index) => (
            <Checkbox
              key={value}
              id={`memory-standard-${index}`}
              label={value}
              {...register(`memory.standard.${index}.${value}`)}
            />
          ))}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-interface" value="memory-interface">
        <Accordion.Control>インターフェース</Accordion.Control>
        <Accordion.Panel>
          {memoryInterfaceList.map((value, index) => {
            const escapedValue = value.replaceAll(".", "_");
            return (
              <Checkbox
                key={value}
                id={`memory-interface-${index}`}
                label={value}
                {...register(`memory.interface.${index}.${escapedValue}`)}
              />
            );
          })}
        </Accordion.Panel>
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
      <Accordion.Item
        key="motherboard-form-factor"
        value="motherboard-form-factor"
      >
        <Accordion.Control>フォームファクタ</Accordion.Control>
        <Accordion.Panel>
          {formFactorList.map((value, index) => (
            <Checkbox
              key={value}
              id={`motherboard-form-factor-${index}`}
              label={value}
              {...register(`motherboard.formFactor.${index}.${value}`)}
            />
          ))}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-socket" value="motherboard-socket">
        <Accordion.Control>ソケット</Accordion.Control>
        <Accordion.Panel>
          <Group gap={2}>
            <div className="p-2">
              {motherboardSocketList.map((value, index) => {
                if (index < 7) {
                  return (
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`motherboard-socket-${index}`}
                      label={value}
                      {...register(`motherboard.socket.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-chipset" value="motherboard-chipset">
        <Accordion.Control>チップセット</Accordion.Control>
        <Accordion.Panel>
          <Group gap={2}>
            <div className="p-2">
              {chipsetList.map((value, index) => {
                if (index < 28) {
                  return (
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`motherboard-chipset-${index}`}
                      label={value}
                      {...register(`motherboard.chipset.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-memory" value="motherboard-memory">
        <Accordion.Control>メモリ</Accordion.Control>
        <Accordion.Panel>
          {motherboardMemoryList.map((value, index) => {
            const escapedValue = value.replaceAll(".", "_");
            return (
              <Checkbox
                key={value}
                id={`motherboard-memory-${index}`}
                label={value}
                {...register(`motherboard.memory.${index}.${escapedValue}`)}
              />
            );
          })}
        </Accordion.Panel>
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
      <Accordion.Item key="gpu-name" value="gpu-name">
        <Accordion.Control>GPU</Accordion.Control>
        <Accordion.Panel>
          {gpuNameList.map((value, index) => (
            <Checkbox
              key={value}
              id={`gpu-gpu-name-${index}`}
              label={value}
              {...register(`gpu.gpuName.${index}.${value}`)}
            />
          ))}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-bus-interface" value="gpu-bus-interfacey">
        <Accordion.Control>バスインターフェース</Accordion.Control>
        <Accordion.Panel>
          {busList.map((value, index) => {
            const escapedValue = value.replaceAll(".", "_");
            return (
              <Checkbox
                key={value}
                id={`gpu-bus-interface-${index}`}
                label={value}
                {...register(`gpu.busInterface.${index}.${escapedValue}`)}
              />
            );
          })}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-standard" value="gpu-standard">
        <Accordion.Control>規格</Accordion.Control>
        <Accordion.Panel>
          <Group gap={2}>
            <div className="p-2">
              {gpuStandardList.map((value, index) => {
                if (index < 5) {
                  return (
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`gpu-standard-${index}`}
                      label={value}
                      {...register(`gpu.standard.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-capacity" value="gpu-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group gap={2}>
            <div className="p-2">
              {gpuCapacityList.map((value, index) => {
                if (index <= gpuCapacityListLengthHalf) {
                  return (
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`gpu-capacity-${index}`}
                      label={formatKb(value)}
                      {...register(`gpu.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
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
      <Accordion.Item key="ssd-capacity" value="ssd-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group gap={2}>
            <div className="p-2">
              {ssdCapacityList.map((value, index) => {
                if (index <= ssdCapacityListLengthHalf) {
                  return (
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`ssd-capacity-${index}`}
                      label={formatKb(value)}
                      {...register(`ssd.capacity.${index}.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="ssd-size" value="ssd-size">
        <Accordion.Control>サイズ</Accordion.Control>
        <Accordion.Panel>
          {sizeList.map((value, index) => {
            const escapedValue = value.replace(".", "_");
            return (
              <Checkbox
                key={value}
                id={`ssd-size-${index}`}
                label={value}
                {...register(`ssd.size.${index}.${escapedValue}`)}
              />
            );
          })}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="ssd-interface" value="ssd-interface">
        <Accordion.Control>インターフェース</Accordion.Control>
        <Accordion.Panel>
          {ssdInterfaceList.map((value, index) => (
            <Checkbox
              key={value}
              id={`ssd-interface-${index}`}
              label={value}
              {...register(`ssd.interface.${index}.${value}`)}
            />
          ))}
        </Accordion.Panel>
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
      <Accordion.Item key="psu-capacity" value="psu-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group gap={2}>
            <div className="p-2">
              {psuCapacityList.map((value, index) => {
                if (index <= psuCapacityListLengthHalf) {
                  return (
                    <Checkbox
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
                    <Checkbox
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
                    <Checkbox
                      key={value}
                      id={`psu-capacity-${value}`}
                      label={value}
                      {...register(`psu.capacity.${value}`)}
                    />
                  );
                }
              })}
            </div>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="psu-certification" value="psu-certification">
        <Accordion.Control>認証</Accordion.Control>
        <Accordion.Panel>
          {psuCertificationList.map((value, index) => (
            <Checkbox
              key={value}
              id={`psu-certification-${index}`}
              label={value}
              {...register(`psu.certification.${index}.${value}`)}
            />
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function CaseAccordion(register: UseFormRegister<FieldValues>) {
  return (
    <Accordion>
      <Accordion.Item key="case-psu-included" value="case-psu-included">
        <Accordion.Control>付属電源</Accordion.Control>
        <Accordion.Panel>
          <Checkbox
            key="psuIncluded.yes"
            id={"case-psu-included-yes"}
            label="あり"
            {...register("case.psuIncluded.yes")}
          />
          <Checkbox
            key="psuIncluded.no"
            id={"case-psu-included-no"}
            label="なし"
            {...register("case.psuIncluded.no")}
          />
        </Accordion.Panel>
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
