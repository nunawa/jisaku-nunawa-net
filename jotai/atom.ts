import { Case } from "@/db/Case";
import { Cpu } from "@/db/Cpu";
import { Gpu } from "@/db/Gpu";
import { Memory } from "@/db/Memory";
import { Motherboard } from "@/db/Motherboard";
import { Psu } from "@/db/Psu";
import { Ssd } from "@/db/Ssd";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const selectedProductsAtom = atom({
  cpu: null,
  memory: null,
  motherboard: null,
  gpu: null,
  ssd: null,
  psu: null,
  case: null,
} as {
  cpu: Cpu | null;
  memory: Memory | null;
  motherboard: Motherboard | null;
  gpu: Gpu | null;
  ssd: Ssd | null;
  psu: Psu | null;
  case: Case | null;
});

export const themeAtom = atomWithStorage("theme", "default");
