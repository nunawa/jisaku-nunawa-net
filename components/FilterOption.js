import {
  Accordion,
  Button,
  Form,
  InputGroup,
  Modal,
  Stack,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function FilterOption({
  show,
  handleClose,
  type,
  buf,
  sql,
  setConvertedProducts,
  submittedFilterOption,
  setSubmittedFilterOption,
}) {
  const { register, handleSubmit, resetField, setValue } = useForm();

  function Accordions({ type }) {
    switch (type) {
      case "cpu":
        let coreCountList = [];
        let cpuSocketList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const coreCountRes = db.exec(
            "SELECT DISTINCT core_count FROM cpu WHERE core_count IS NOT NULL ORDER BY core_count",
          );
          coreCountList = coreCountRes[0].values.flat();
          const cpuSocketRes = db.exec(
            "SELECT DISTINCT socket FROM cpu WHERE socket IS NOT NULL ORDER BY socket",
          );
          cpuSocketList = cpuSocketRes[0].values.flat();
        }

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
                            id={`${type}-core-count-${value}`}
                            label={value}
                            {...register(`${type}.coreCount.${value}`)}
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
                            id={`${type}-core-count-${value}`}
                            label={value}
                            {...register(`${type}.coreCount.${value}`)}
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
                            id={`${type}-core-count-${value}`}
                            label={value}
                            {...register(`${type}.coreCount.${value}`)}
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
                            id={`${type}-socket-${index}`}
                            label={value}
                            {...register(`${type}.socket.${index}.${value}`)}
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
                            id={`${type}-socket-${index}`}
                            label={value}
                            {...register(`${type}.socket.${index}.${value}`)}
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
                  id={`${type}-igpu-yes`}
                  label="あり"
                  {...register(`${type}.igpu.yes`)}
                />
                <Form.Check
                  key="igpu.no"
                  id={`${type}-igpu-no`}
                  label="なし"
                  {...register(`${type}.igpu.no`)}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "memory":
        let memoryCapacityList = [];
        let pcsList = [];
        let standardList = [];
        let memoryInterfaceList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const memoryCapacityRes = db.exec(
            "SELECT DISTINCT capacity FROM memory WHERE capacity != '' ORDER BY capacity",
          );
          memoryCapacityList = memoryCapacityRes[0].values.flat();

          const pcsRes = db.exec(
            "SELECT DISTINCT pcs FROM memory WHERE pcs IS NOT NULL ORDER BY pcs",
          );
          pcsList = pcsRes[0].values.flat();

          const standardRes = db.exec(
            "SELECT DISTINCT standard FROM memory WHERE standard != '' ORDER BY standard",
          );
          standardList = standardRes[0].values.flat();

          const memoryInterfaceRes = db.exec(
            "SELECT DISTINCT interface FROM memory WHERE interface != '' ORDER BY interface",
          );
          memoryInterfaceList = memoryInterfaceRes[0].values.flat();
        }

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
                            id={`${type}-capacity-${index}`}
                            label={value}
                            {...register(`${type}.capacity.${index}.${value}`)}
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
                            id={`${type}-capacity-${index}`}
                            label={value}
                            {...register(`${type}.capacity.${index}.${value}`)}
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
                    id={`${type}-pcs-${value}`}
                    label={value}
                    {...register(`${type}.pcs.${value}`)}
                  />
                ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>規格</Accordion.Header>
              <Accordion.Body>
                {standardList.map((value, index) => (
                  <Form.Check
                    key={value}
                    id={`${type}-standard-${index}`}
                    label={value}
                    {...register(`${type}.standard.${index}.${value}`)}
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
                      id={`${type}-interface-${index}`}
                      label={value}
                      {...register(
                        `${type}.interface.${index}.${escapedValue}`,
                      )}
                    />
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "motherboard":
        let formFactorList = [];
        let motherboardSocketList = [];
        let chipsetList = [];
        let motherboardMemoryList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const formFactorRes = db.exec(
            "SELECT DISTINCT form_factor FROM motherboard WHERE form_factor != '' ORDER BY form_factor",
          );
          formFactorList = formFactorRes[0].values.flat();

          const motherboardSocketRes = db.exec(
            "SELECT DISTINCT socket FROM motherboard WHERE socket != '' AND socket NOT LIKE '%Onboard%' ORDER BY socket",
          );
          motherboardSocketList = motherboardSocketRes[0].values.flat();

          const chipsetRes = db.exec(
            "SELECT DISTINCT chipset FROM motherboard WHERE chipset != '' ORDER BY chipset",
          );
          chipsetList = chipsetRes[0].values.flat();

          const motherboardMemoryRes = db.exec(
            "SELECT DISTINCT memory FROM motherboard WHERE memory != '' ORDER BY memory",
          );
          motherboardMemoryList = motherboardMemoryRes[0].values.flat();
        }

        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>フォームファクタ</Accordion.Header>
              <Accordion.Body>
                {formFactorList.map((value, index) => (
                  <Form.Check
                    key={value}
                    id={`${type}-form-factor-${index}`}
                    label={value}
                    {...register(`${type}.formFactor.${index}.${value}`)}
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
                            id={`${type}-socket-${index}`}
                            label={value}
                            {...register(`${type}.socket.${index}.${value}`)}
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
                            id={`${type}-socket-${index}`}
                            label={value}
                            {...register(`${type}.socket.${index}.${value}`)}
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
                            id={`${type}-chipset-${index}`}
                            label={value}
                            {...register(`${type}.chipset.${index}.${value}`)}
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
                            id={`${type}-chipset-${index}`}
                            label={value}
                            {...register(`${type}.chipset.${index}.${value}`)}
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
                      id={`${type}-memory-${index}`}
                      label={value}
                      {...register(`${type}.memory.${index}.${escapedValue}`)}
                    />
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "gpu":
        let gpuNameList = [];
        let busList = [];
        let gpuMemoryList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const gpuNameRes = db.exec(
            "SELECT DISTINCT gpu_name FROM gpu WHERE gpu_name != '' AND gpu_name NOT LIKE '%ATI%' AND gpu_name NOT LIKE '%MATROX%' ORDER BY gpu_name",
          );
          gpuNameList = gpuNameRes[0].values.flat();

          const busRes = db.exec(
            "SELECT DISTINCT bus_interface FROM gpu WHERE bus_interface != '' AND bus_interface LIKE '%PCI%' ORDER BY bus_interface",
          );
          busList = busRes[0].values.flat();

          const gpuMemoryRes = db.exec(
            "SELECT DISTINCT memory FROM gpu WHERE memory != '' ORDER BY memory",
          );
          gpuMemoryList = gpuMemoryRes[0].values.flat();
        }

        return (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>GPU</Accordion.Header>
              <Accordion.Body>
                {gpuNameList.map((value, index) => (
                  <Form.Check
                    key={value}
                    id={`${type}-gpu-name-${index}`}
                    label={value}
                    {...register(`${type}.gpuName.${index}.${value}`)}
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
                      id={`${type}-bus-interface-${index}`}
                      label={value}
                      {...register(
                        `${type}.busInterface.${index}.${escapedValue}`,
                      )}
                    />
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>メモリ</Accordion.Header>
              <Accordion.Body>
                <Stack direction="horizontal" gap={2}>
                  <div className="p-2">
                    {gpuMemoryList.map((value, index) => {
                      if (index < 26) {
                        return (
                          <Form.Check
                            key={value}
                            id={`${type}-memory-${index}`}
                            label={value}
                            {...register(`${type}.memory.${index}.${value}`)}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="p-2">
                    {gpuMemoryList.map((value, index) => {
                      if (index >= 26) {
                        return (
                          <Form.Check
                            key={value}
                            id={`${type}-memory-${index}`}
                            label={value}
                            {...register(`${type}.memory.${index}.${value}`)}
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
      case "ssd":
        let ssdCapacityList = [];
        let sizeList = [];
        let ssdInterfaceList = [];

        if (buf && sql) {
          const db = new sql.Database(new Uint8Array(buf));
          const ssdCapacityRes = db.exec(
            "SELECT DISTINCT capacity FROM ssd WHERE capacity != '' ORDER BY capacity",
          );
          ssdCapacityList = ssdCapacityRes[0].values.flat();

          const sizeRes = db.exec(
            "SELECT DISTINCT size FROM ssd WHERE size != '' ORDER BY size",
          );
          sizeList = sizeRes[0].values.flat();

          const ssdInterfaceRes = db.exec(
            "SELECT DISTINCT interface FROM ssd WHERE interface != '' AND interface NOT LIKE '%USB%' ORDER BY interface",
          );
          ssdInterfaceList = ssdInterfaceRes[0].values.flat();
        }

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
                            id={`${type}-capacity-${index}`}
                            label={value}
                            {...register(`${type}.capacity.${index}.${value}`)}
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
                            id={`${type}-capacity-${index}`}
                            label={value}
                            {...register(`${type}.capacity.${index}.${value}`)}
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
                      id={`${type}-size-${index}`}
                      label={value}
                      {...register(`${type}.size.${index}.${escapedValue}`)}
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
                    id={`${type}-interface-${index}`}
                    label={value}
                    {...register(`${type}.interface.${index}.${value}`)}
                  />
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      default:
        break;
    }
  }

  function onSubmit(data) {
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
    let standard = "";
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
      standard = filteredStandard.join(" OR ");

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
    let gpuMemory = "";
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

      let filteredGpuMemory = [];
      for (const iter of data.gpu.memory) {
        for (const [key, value] of Object.entries(iter)) {
          if (value === true) {
            filteredGpuMemory.push(`memory = "${key}"`);
          }
        }
      }
      gpuMemory = filteredGpuMemory.join(" OR ");
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
      standard ||
      memoryInterface ||
      formFactor ||
      motherboardSocket ||
      chipset ||
      motherboardMemory ||
      gpuName ||
      busInterface ||
      gpuMemory ||
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
        standard,
        memoryInterface,
        formFactor,
        motherboardSocket,
        chipset,
        motherboardMemory,
        gpuName,
        busInterface,
        gpuMemory,
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
      let productList = [];
      db.each(`SELECT * FROM ${type} ${where} ${sort} LIMIT 30`, (row) => {
        productList.push(row);
      });
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
      setValue("gpu.memory", submittedFilterOption.gpu.memory);
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
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Accordions type={type} />
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
