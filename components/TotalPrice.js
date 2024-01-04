import { totalPriceAtom } from "@/jotai/atom";
import { useAtomValue } from "jotai";

export default function TotalPrice() {
  const totalPrice = useAtomValue(totalPriceAtom);
  return <>￥{totalPrice.toLocaleString()}</>;
}
