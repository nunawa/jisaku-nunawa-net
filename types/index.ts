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
  ssd: any;
  gpu: any;
  motherboard: any;
  memory: any;
  cpu: any;
  sort: string;
  keyword: string;
  min: string;
  max: string;
};
