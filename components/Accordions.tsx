import cpuJson from "@/json/cpu.json";
import gpuJson from "@/json/gpu.json";
import memoryJson from "@/json/memory.json";
import motherboardJson from "@/json/motherboard.json";
import psuJson from "@/json/psu.json";
import ssdJson from "@/json/ssd.json";
import { productType } from "@/types";
import { formatKb } from "@/utils/formatKb";
import { Accordion, Checkbox, Group, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

function CpuAccordion(form: UseFormReturnType<any>) {
  const coreCountList = cpuJson.core_count;
  const cpuSocketList = cpuJson.socket;

  return (
    <Accordion>
      <Accordion.Item key="cpu-core-count" value="cpu-core-count">
        <Accordion.Control>コア数</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Stack gap="sm">
              {coreCountList.map((value, index) => {
                if (index < 7) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`cpu.coreCount.${value}`)}
                      {...form.getInputProps(`cpu.coreCount.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {coreCountList.map((value, index) => {
                if (index >= 7 && index < 14) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`cpu.coreCount.${value}`)}
                      {...form.getInputProps(`cpu.coreCount.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {coreCountList.map((value, index) => {
                if (index >= 14) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`cpu.coreCount.${value}`)}
                      {...form.getInputProps(`cpu.coreCount.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="cpu-socket" value="cpu-socket">
        <Accordion.Control>ソケット</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm">
            <Stack gap="sm">
              {cpuSocketList.map((value, index) => {
                if (index < 10) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`cpu.socket.${value}`)}
                      {...form.getInputProps(`cpu.socket.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {cpuSocketList.map((value, index) => {
                if (index >= 10) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`cpu.socket.${value}`)}
                      {...form.getInputProps(`cpu.socket.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="cpu-igpu" value="cpu-igpu">
        <Accordion.Control>内蔵GPU</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            <Checkbox
              label="あり"
              key={form.key("cpu.igpu.yes")}
              {...form.getInputProps("cpu.igpu.yes", { type: "checkbox" })}
            />
            <Checkbox
              label="なし"
              key={form.key("cpu.igpu.no")}
              {...form.getInputProps("cpu.igpu.no", { type: "checkbox" })}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function MemoryAccordion(form: UseFormReturnType<any>) {
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
          <Group mt="sm" gap="xl">
            <Stack gap="sm">
              {memoryCapacityList.map((value, index) => {
                if (index <= memoryCapacityListLengthHalf) {
                  return (
                    <Checkbox
                      label={formatKb(value)}
                      key={form.key(`memory.capacity.${value}`)}
                      {...form.getInputProps(`memory.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {memoryCapacityList.map((value, index) => {
                if (index > memoryCapacityListLengthHalf) {
                  return (
                    <Checkbox
                      label={formatKb(value)}
                      key={form.key(`memory.capacity.${value}`)}
                      {...form.getInputProps(`memory.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-pcs" value="memory-pcs">
        <Accordion.Control>枚数</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            {pcsList.map((value) => (
              <Checkbox
                label={value}
                key={form.key(`memory.pcs.${value}`)}
                {...form.getInputProps(`memory.pcs.${value}`, {
                  type: "checkbox",
                })}
              />
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-standard" value="memory-standard">
        <Accordion.Control>規格</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            {memoryStandardList.map((value, index) => (
              <Checkbox
                label={value}
                key={form.key(`memory.standard.${value}`)}
                {...form.getInputProps(`memory.standard.${value}`, {
                  type: "checkbox",
                })}
              />
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-interface" value="memory-interface">
        <Accordion.Control>インターフェース</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            {memoryInterfaceList.map((value, index) => {
              const escapedValue = value.replaceAll(".", "_");
              return (
                <Checkbox
                  label={value}
                  key={form.key(`memory.interface.${escapedValue}`)}
                  {...form.getInputProps(`memory.interface.${escapedValue}`, {
                    type: "checkbox",
                  })}
                />
              );
            })}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function MotherboardAccordion(form: UseFormReturnType<any>) {
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
          <Stack mt="sm" gap="sm">
            {formFactorList.map((value, index) => (
              <Checkbox
                label={value}
                key={form.key(`motherboard.formFactor.${value}`)}
                {...form.getInputProps(`motherboard.formFactor.${value}`, {
                  type: "checkbox",
                })}
              />
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-socket" value="motherboard-socket">
        <Accordion.Control>ソケット</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Stack gap="sm">
              {motherboardSocketList.map((value, index) => {
                if (index < 7) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`motherboard.socket.${value}`)}
                      {...form.getInputProps(`motherboard.socket.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {motherboardSocketList.map((value, index) => {
                if (index >= 7) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`motherboard.socket.${value}`)}
                      {...form.getInputProps(`motherboard.socket.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-chipset" value="motherboard-chipset">
        <Accordion.Control>チップセット</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Stack gap="sm">
              {chipsetList.map((value, index) => {
                if (index < 28) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`motherboard.chipset.${value}`)}
                      {...form.getInputProps(`motherboard.chipset.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {chipsetList.map((value, index) => {
                if (index >= 28) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`motherboard.chipset.${value}`)}
                      {...form.getInputProps(`motherboard.chipset.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-memory" value="motherboard-memory">
        <Accordion.Control>メモリ</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            {motherboardMemoryList.map((value, index) => {
              const escapedValue = value.replaceAll(".", "_");
              return (
                <Checkbox
                  label={value}
                  key={form.key(`motherboard.memory.${escapedValue}`)}
                  {...form.getInputProps(`motherboard.memory.${escapedValue}`, {
                    type: "checkbox",
                  })}
                />
              );
            })}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function GpuAccordion(form: UseFormReturnType<any>) {
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
          <Stack mt="sm" gap="sm">
            {gpuNameList.map((value, index) => (
              <Checkbox
                label={value}
                key={form.key(`gpu.gpuName.${value}`)}
                {...form.getInputProps(`gpu.gpuName.${value}`, {
                  type: "checkbox",
                })}
              />
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-bus-interface" value="gpu-bus-interfacey">
        <Accordion.Control>バスインターフェース</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            {busList.map((value, index) => {
              const escapedValue = value.replaceAll(".", "_");
              return (
                <Checkbox
                  label={value}
                  key={form.key(`gpu.busInterface.${escapedValue}`)}
                  {...form.getInputProps(`gpu.busInterface.${escapedValue}`, {
                    type: "checkbox",
                  })}
                />
              );
            })}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-standard" value="gpu-standard">
        <Accordion.Control>規格</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Stack gap="sm">
              {gpuStandardList.map((value, index) => {
                if (index < 5) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`gpu.standard.${value}`)}
                      {...form.getInputProps(`gpu.standard.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {gpuStandardList.map((value, index) => {
                if (index >= 5) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`gpu.standard.${value}`)}
                      {...form.getInputProps(`gpu.standard.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-capacity" value="gpu-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Stack gap="sm">
              {gpuCapacityList.map((value, index) => {
                if (index <= gpuCapacityListLengthHalf) {
                  return (
                    <Checkbox
                      label={formatKb(value)}
                      key={form.key(`gpu.capacity.${value}`)}
                      {...form.getInputProps(`gpu.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {gpuCapacityList.map((value, index) => {
                if (index > gpuCapacityListLengthHalf) {
                  return (
                    <Checkbox
                      label={formatKb(value)}
                      key={form.key(`gpu.capacity.${value}`)}
                      {...form.getInputProps(`gpu.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function SsdAccordion(form: UseFormReturnType<any>) {
  const ssdCapacityList = ssdJson.capacity;
  const sizeList = ssdJson.size;
  const ssdInterfaceList = ssdJson.interface;

  const ssdCapacityListLengthHalf = Math.floor(ssdCapacityList.length / 2);

  return (
    <Accordion>
      <Accordion.Item key="ssd-capacity" value="ssd-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Stack gap="sm">
              {ssdCapacityList.map((value, index) => {
                if (index <= ssdCapacityListLengthHalf) {
                  return (
                    <Checkbox
                      label={formatKb(value)}
                      key={form.key(`ssd.capacity.${value}`)}
                      {...form.getInputProps(`ssd.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {ssdCapacityList.map((value, index) => {
                if (index > ssdCapacityListLengthHalf) {
                  return (
                    <Checkbox
                      label={formatKb(value)}
                      key={form.key(`ssd.capacity.${value}`)}
                      {...form.getInputProps(`ssd.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="ssd-size" value="ssd-size">
        <Accordion.Control>サイズ</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            {sizeList.map((value, index) => {
              const escapedValue = value.replace(".", "_");
              return (
                <Checkbox
                  label={value}
                  key={form.key(`ssd.size.${escapedValue}`)}
                  {...form.getInputProps(`ssd.size.${escapedValue}`, {
                    type: "checkbox",
                  })}
                />
              );
            })}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="ssd-interface" value="ssd-interface">
        <Accordion.Control>インターフェース</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            {ssdInterfaceList.map((value, index) => (
              <Checkbox
                label={value}
                key={form.key(`ssd.interface.${value}`)}
                {...form.getInputProps(`ssd.interface.${value}`, {
                  type: "checkbox",
                })}
              />
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function PsuAccordion(form: UseFormReturnType<any>) {
  const psuCapacityList = psuJson.capacity;
  const psuCertificationList = psuJson.certification;

  const psuCapacityListLengthHalf = Math.floor(psuCapacityList.length / 3);

  return (
    <Accordion>
      <Accordion.Item key="psu-capacity" value="psu-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Stack gap="sm">
              {psuCapacityList.map((value, index) => {
                if (index <= psuCapacityListLengthHalf) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`psu.capacity.${value}`)}
                      {...form.getInputProps(`psu.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {psuCapacityList.map((value, index) => {
                if (
                  index > psuCapacityListLengthHalf &&
                  index <= psuCapacityListLengthHalf * 2
                ) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`psu.capacity.${value}`)}
                      {...form.getInputProps(`psu.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
            <Stack gap="sm">
              {psuCapacityList.map((value, index) => {
                if (index > psuCapacityListLengthHalf * 2) {
                  return (
                    <Checkbox
                      label={value}
                      key={form.key(`psu.capacity.${value}`)}
                      {...form.getInputProps(`psu.capacity.${value}`, {
                        type: "checkbox",
                      })}
                    />
                  );
                }
              })}
            </Stack>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="psu-certification" value="psu-certification">
        <Accordion.Control>認証</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            {psuCertificationList.map((value, index) => (
              <Checkbox
                label={value}
                key={form.key(`psu.certification.${value}`)}
                {...form.getInputProps(`psu.certification.${value}`, {
                  type: "checkbox",
                })}
              />
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function CaseAccordion(form: UseFormReturnType<any>) {
  return (
    <Accordion>
      <Accordion.Item key="case-psu-included" value="case-psu-included">
        <Accordion.Control>付属電源</Accordion.Control>
        <Accordion.Panel>
          <Stack mt="sm" gap="sm">
            <Checkbox
              label="あり"
              key={form.key("case.psuIncluded.yes")}
              {...form.getInputProps("case.psuIncluded.yes", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="なし"
              key={form.key("case.psuIncluded.no")}
              {...form.getInputProps("case.psuIncluded.no", {
                type: "checkbox",
              })}
            />
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default function Accordions({
  type,
  form,
}: {
  type: keyof productType;
  form: UseFormReturnType<any>;
}) {
  switch (type) {
    case "cpu":
      return CpuAccordion(form);
    case "memory":
      return MemoryAccordion(form);
    case "motherboard":
      return MotherboardAccordion(form);
    case "gpu":
      return GpuAccordion(form);
    case "ssd":
      return SsdAccordion(form);
    case "psu":
      return PsuAccordion(form);
    case "case":
      return CaseAccordion(form);
  }
}
