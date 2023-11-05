import { atom } from "jotai";

export const selectedProductsAtom = atom({
  cpu: null,
  memory: null,
  motherboard: null,
  gpu: null,
  ssd: null,
});

export const totalPriceAtom = atom(0);
