import { selectedProductsAtom } from "@/jotai/atom";
import { useAtomValue } from "jotai";

export default function TotalPrice() {
  const selectedProducts = useAtomValue(selectedProductsAtom);

  let totalPrice = 0;
  for (const iterator of Object.values(selectedProducts)) {
    if (iterator?.price) {
      totalPrice += iterator.price;
    }
  }

  return `￥${totalPrice.toLocaleString()}`;
}
