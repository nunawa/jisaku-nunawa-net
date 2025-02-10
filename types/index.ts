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

export type filterOptions = {
  sort: string;
  keyword: string;
  min: string;
  max: string;
  cpu:
    | {
        coreCount: boolean[];
        socket: Object[];
        igpu: { yes: boolean; no: boolean };
      }
    | undefined;
  memory:
    | {
        capacity: Object[];
        pcs: boolean[];
        standard: Object[];
        interface: Object[];
      }
    | undefined;
  motherboard:
    | {
        formFactor: Object[];
        socket: Object[];
        chipset: Object[];
        memory: Object[];
      }
    | undefined;
  gpu:
    | {
        gpuName: Object[];
        busInterface: Object[];
        standard: Object[];
        capacity: Object[];
      }
    | undefined;
  ssd:
    | {
        capacity: Object[];
        size: Object[];
        interface: Object[];
      }
    | undefined;
};
