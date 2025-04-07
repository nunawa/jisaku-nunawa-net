"use client";

import PartsMain from "@/components/PartsMain";
import { Cpu } from "@/db/Cpu";

export default function Page() {
  return <PartsMain type="cpu" entity={new Cpu()} />;
}
