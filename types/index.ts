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
  psu: productInfo | null;
  case: productInfo | null;
};

export type cpuFilterOption = {
  coreCount: Record<number, boolean>;
  socket: Record<string, boolean>;
  igpu: { yes: boolean; no: boolean };
};

export type memoryFilterOption = {
  capacity: Record<number, boolean>;
  pcs: Record<number, boolean>;
  standard: Record<string, boolean>;
  interface: Record<string, boolean>;
};

export type motherboardFilterOption = {
  formFactor: Record<string, boolean>;
  socket: Record<string, boolean>;
  chipset: Record<string, boolean>;
  memory: Record<string, boolean>;
};

export type gpuFilterOption = {
  gpuName: Record<string, boolean>;
  busInterface: Record<string, boolean>;
  standard: Record<string, boolean>;
  capacity: Record<number, boolean>;
};

export type ssdFilterOption = {
  capacity: Record<number, boolean>;
  size: Record<string, boolean>;
  interface: Record<string, boolean>;
};

export type psuFilterOption = {
  capacity: Record<number, boolean>;
  certification: Record<string, boolean>;
};

export type caseFilterOption = {
  psuIncluded: { yes: boolean; no: boolean };
};

export type filterOptions = {
  sort: string;
  keyword: string;
  min: string;
  max: string;
  cpu: cpuFilterOption;
  memory: memoryFilterOption;
  motherboard: motherboardFilterOption;
  gpu: gpuFilterOption;
  ssd: ssdFilterOption;
  psu: psuFilterOption;
  case: caseFilterOption;
};
