import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const selectedProductsAtom = atom({
  cpu: null,
  memory: null,
  motherboard: null,
  gpu: null,
  ssd: null,
});

export const themeAtom = atomWithStorage("default");
