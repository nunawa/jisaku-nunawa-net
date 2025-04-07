"use client";

import PartsMain from "@/components/PartsMain";
import { Ssd } from "@/db/Ssd";

export default function Page() {
  return <PartsMain type="ssd" entity={new Ssd()} />;
}
