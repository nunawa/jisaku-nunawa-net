"use client";

import PartsMain from "@/components/PartsMain";
import { Case } from "@/db/Case";

export default function Page() {
  return <PartsMain type="case" entity={new Case()} />;
}
