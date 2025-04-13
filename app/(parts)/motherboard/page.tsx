"use client";

import PartsMain from "@/components/PartsMain";
import { Motherboard } from "@/db/Motherboard";

export default function Page() {
  return <PartsMain type="motherboard" entity={Motherboard} />;
}
