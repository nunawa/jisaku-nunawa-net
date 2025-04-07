"use client";

import PartsMain from "@/components/PartsMain";
import { Psu } from "@/db/Psu";

export default function Page() {
  return <PartsMain type="psu" entity={new Psu()} />;
}
