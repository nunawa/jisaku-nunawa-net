"use client";

import PartsMain from "@/components/PartsMain";
import { Gpu } from "@/db/Gpu";

export default function Page() {
  return <PartsMain type="gpu" entity={Gpu} />;
}
