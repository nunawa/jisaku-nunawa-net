import cpuJson from "@/json/cpu.json";
import gpuJson from "@/json/gpu.json";
import memoryJson from "@/json/memory.json";
import motherboardJson from "@/json/motherboard.json";
import psuJson from "@/json/psu.json";
import ssdJson from "@/json/ssd.json";
import { filterOptions, productType } from "@/types";
import { formatKb } from "@/utils/formatKb";
import { Accordion, Checkbox, Group, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

function CheckboxWithForm({
  option,
  form,
  keyPrefix,
  isNeedFormattedLabel,
}: {
  option: string | number;
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >;
  keyPrefix: string;
  isNeedFormattedLabel: boolean;
}) {
  const label =
    typeof option === "number" && isNeedFormattedLabel
      ? formatKb(option)
      : option;

  // useFormに意図しないキーで保存されるのを防ぐため、"."をエスケープする
  const key =
    typeof option === "string" && option.includes(".")
      ? `${keyPrefix}.${option.replaceAll(".", "_")}`
      : `${keyPrefix}.${option}`;

  return (
    <Checkbox
      label={label}
      key={form.key(key)}
      {...form.getInputProps(key, {
        type: "checkbox",
      })}
    />
  );
}

function Checkboxes({
  options,
  columns,
  form,
  keyPrefix,
  isNeedFormattedLabel = false,
}: {
  options: string[] | number[];
  columns: 1 | 2 | 3;
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >;
  keyPrefix: string;
  isNeedFormattedLabel?: boolean;
}) {
  switch (columns) {
    case 1:
      return (
        <Stack mt="sm" gap="sm">
          {options.map((value) => (
            <CheckboxWithForm
              option={value}
              form={form}
              keyPrefix={keyPrefix}
              isNeedFormattedLabel={isNeedFormattedLabel}
              key={value}
            />
          ))}
        </Stack>
      );

    case 2:
      const half = Math.round(options.length / 2);

      return (
        <>
          <Stack gap="sm">
            {options
              .filter((_, index) => index < half)
              .map((value) => (
                <CheckboxWithForm
                  option={value}
                  form={form}
                  keyPrefix={keyPrefix}
                  isNeedFormattedLabel={isNeedFormattedLabel}
                  key={value}
                />
              ))}
          </Stack>
          <Stack gap="sm">
            {options
              .filter((_, index) => index >= half)
              .map((value) => (
                <CheckboxWithForm
                  option={value}
                  form={form}
                  keyPrefix={keyPrefix}
                  isNeedFormattedLabel={isNeedFormattedLabel}
                  key={value}
                />
              ))}
          </Stack>
        </>
      );

    case 3:
      const third = Math.round(options.length / 3);

      return (
        <>
          <Stack gap="sm">
            {options
              .filter((_, index) => index < third)
              .map((value) => (
                <CheckboxWithForm
                  option={value}
                  form={form}
                  keyPrefix={keyPrefix}
                  isNeedFormattedLabel={isNeedFormattedLabel}
                  key={value}
                />
              ))}
          </Stack>
          <Stack gap="sm">
            {options
              .filter((_, index) => index >= third && index < third * 2)
              .map((value) => (
                <CheckboxWithForm
                  option={value}
                  form={form}
                  keyPrefix={keyPrefix}
                  isNeedFormattedLabel={isNeedFormattedLabel}
                  key={value}
                />
              ))}
          </Stack>
          <Stack gap="sm">
            {options
              .filter((_, index) => index >= third * 2)
              .map((value) => (
                <CheckboxWithForm
                  option={value}
                  form={form}
                  keyPrefix={keyPrefix}
                  isNeedFormattedLabel={isNeedFormattedLabel}
                  key={value}
                />
              ))}
          </Stack>
        </>
      );
  }
}

function CpuAccordion(
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >,
) {
  const coreCountList = cpuJson.core_count;
  const cpuSocketList = cpuJson.socket;

  return (
    <Accordion>
      <Accordion.Item key="cpu-core-count" value="cpu-core-count">
        <Accordion.Control>コア数</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Checkboxes
              options={coreCountList}
              columns={3}
              form={form}
              keyPrefix={"cpu.coreCount"}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="cpu-socket" value="cpu-socket">
        <Accordion.Control>ソケット</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm">
            <Checkboxes
              options={cpuSocketList}
              columns={2}
              form={form}
              keyPrefix={"cpu.socket"}
            />
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

function MemoryAccordion(
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >,
) {
  const memoryCapacityList = memoryJson.capacity;
  const pcsList = memoryJson.pcs;
  const memoryStandardList = memoryJson.standard;
  const memoryInterfaceList = memoryJson.interface;

  return (
    <Accordion>
      <Accordion.Item key="memory-capacity" value="memory-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Checkboxes
              options={memoryCapacityList}
              columns={2}
              form={form}
              keyPrefix={"memory.capacity"}
              isNeedFormattedLabel={true}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-pcs" value="memory-pcs">
        <Accordion.Control>枚数</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={pcsList}
            columns={1}
            form={form}
            keyPrefix={"memory.pcs"}
          />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-standard" value="memory-standard">
        <Accordion.Control>規格</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={memoryStandardList}
            columns={1}
            form={form}
            keyPrefix={"memory.standard"}
          />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="memory-interface" value="memory-interface">
        <Accordion.Control>インターフェース</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={memoryInterfaceList}
            columns={1}
            form={form}
            keyPrefix={"memory.interface"}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function MotherboardAccordion(
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >,
) {
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
          <Checkboxes
            options={formFactorList}
            columns={1}
            form={form}
            keyPrefix={"motherboard.formFactor"}
          />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-socket" value="motherboard-socket">
        <Accordion.Control>ソケット</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Checkboxes
              options={motherboardSocketList}
              columns={2}
              form={form}
              keyPrefix={"motherboard.socket"}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-chipset" value="motherboard-chipset">
        <Accordion.Control>チップセット</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Checkboxes
              options={chipsetList}
              columns={2}
              form={form}
              keyPrefix={"motherboard.chipset"}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="motherboard-memory" value="motherboard-memory">
        <Accordion.Control>メモリ</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={motherboardMemoryList}
            columns={1}
            form={form}
            keyPrefix={"motherboard.memory"}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function GpuAccordion(
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >,
) {
  const gpuNameList = gpuJson.gpu_name;
  const busList = gpuJson.bus_interface;
  const gpuStandardList = gpuJson.standard;
  const gpuCapacityList = gpuJson.capacity;

  return (
    <Accordion>
      <Accordion.Item key="gpu-name" value="gpu-name">
        <Accordion.Control>GPU</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={gpuNameList}
            columns={1}
            form={form}
            keyPrefix={"gpu.gpuName"}
          />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-bus-interface" value="gpu-bus-interfacey">
        <Accordion.Control>バスインターフェース</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={busList}
            columns={1}
            form={form}
            keyPrefix={"gpu.busInterface"}
          />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-standard" value="gpu-standard">
        <Accordion.Control>規格</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Checkboxes
              options={gpuStandardList}
              columns={2}
              form={form}
              keyPrefix={"gpu.standard"}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="gpu-capacity" value="gpu-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Checkboxes
              options={gpuCapacityList}
              columns={2}
              form={form}
              keyPrefix={"gpu.capacity"}
              isNeedFormattedLabel={true}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function SsdAccordion(
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >,
) {
  const ssdCapacityList = ssdJson.capacity;
  const sizeList = ssdJson.size;
  const ssdInterfaceList = ssdJson.interface;

  return (
    <Accordion>
      <Accordion.Item key="ssd-capacity" value="ssd-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Checkboxes
              options={ssdCapacityList}
              columns={2}
              form={form}
              keyPrefix={"ssd.capacity"}
              isNeedFormattedLabel={true}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="ssd-size" value="ssd-size">
        <Accordion.Control>サイズ</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={sizeList}
            columns={1}
            form={form}
            keyPrefix={"ssd.size"}
          />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="ssd-interface" value="ssd-interface">
        <Accordion.Control>インターフェース</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={ssdInterfaceList}
            columns={1}
            form={form}
            keyPrefix={"ssd.interface"}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function PsuAccordion(
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >,
) {
  const psuCapacityList = psuJson.capacity;
  const psuCertificationList = psuJson.certification;

  return (
    <Accordion>
      <Accordion.Item key="psu-capacity" value="psu-capacity">
        <Accordion.Control>容量</Accordion.Control>
        <Accordion.Panel>
          <Group mt="sm" gap="xl">
            <Checkboxes
              options={psuCapacityList}
              columns={3}
              form={form}
              keyPrefix={"psu.capacity"}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key="psu-certification" value="psu-certification">
        <Accordion.Control>認証</Accordion.Control>
        <Accordion.Panel>
          <Checkboxes
            options={psuCertificationList}
            columns={1}
            form={form}
            keyPrefix={"psu.certification"}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function CaseAccordion(
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >,
) {
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
  type: productType;
  form: UseFormReturnType<
    filterOptions,
    (values: filterOptions) => filterOptions
  >;
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
