import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { productType } from "@/types";

export const selectedProductsAtom = atom({
  cpu: null,
  memory: null,
  motherboard: null,
  gpu: null,
  ssd: null,
} as productType);

export const themeAtom = atomWithStorage("theme", "default");
