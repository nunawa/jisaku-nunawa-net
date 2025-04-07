"use client";

import PartsMain from "@/components/PartsMain";
import { Memory } from "@/db/Memory";

export default function Page() {
  return <PartsMain type="memory" entity={new Memory()} />;
}
