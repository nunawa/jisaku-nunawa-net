import { selectedProductsAtom } from "@/jotai/atom";
import {
  checkAllCompatibility,
  CompatibilityIssue,
} from "@/utils/compatibility";
import { Alert, Stack } from "@mantine/core";
import { useAtomValue } from "jotai";
import { BsExclamationTriangleFill } from "react-icons/bs";

export default function CompatibilityWarnings() {
  const selectedProducts = useAtomValue(selectedProductsAtom);

  // Check compatibility issues
  const compatibilityIssues = checkAllCompatibility(selectedProducts);

  // If no issues, don't render anything
  if (compatibilityIssues.length === 0) {
    return null;
  }

  return (
    <Stack gap="xs" mb="sm">
      {compatibilityIssues.map((issue: CompatibilityIssue, index: number) => (
        <Alert
          key={index}
          icon={<BsExclamationTriangleFill />}
          title="互換性の警告"
          color="red"
          variant="light"
        >
          {issue.message}
        </Alert>
      ))}
    </Stack>
  );
}
