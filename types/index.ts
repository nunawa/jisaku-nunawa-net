export type productInfo = {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
};

export type productType = {
  cpu: productInfo | null;
  memory: productInfo | null;
  motherboard: productInfo | null;
  gpu: productInfo | null;
  ssd: productInfo | null;
};

export type cpuFilterOption = {
  coreCount: boolean[];
  socket: Object[];
  igpu: { yes: boolean; no: boolean };
};

export type memoryFilterOption = {
  capacity: Object[];
  pcs: boolean[];
  standard: Object[];
  interface: Object[];
};

export type motherboardFilterOption = {
  formFactor: Object[];
  socket: Object[];
  chipset: Object[];
  memory: Object[];
};

export type gpuFilterOption = {
  gpuName: Object[];
  busInterface: Object[];
  standard: Object[];
  capacity: Object[];
};

export type ssdFilterOption = {
  capacity: Object[];
  size: Object[];
  interface: Object[];
};

export type filterOptions = {
  sort: string;
  keyword: string;
  min: string;
  max: string;
  cpu: cpuFilterOption | undefined;
  memory: memoryFilterOption | undefined;
  motherboard: motherboardFilterOption | undefined;
  gpu: gpuFilterOption | undefined;
  ssd: ssdFilterOption | undefined;
};
