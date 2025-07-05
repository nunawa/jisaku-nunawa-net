import { Case } from "@/db/Case";
import { Cpu } from "@/db/Cpu";
import { Memory } from "@/db/Memory";
import { Motherboard } from "@/db/Motherboard";

export interface CompatibilityIssue {
  type: "cpu-motherboard" | "motherboard-memory" | "motherboard-case";
  message: string;
  severity: "warning" | "error";
}

export interface SelectedParts {
  cpu: Cpu | null;
  memory: Memory | null;
  motherboard: Motherboard | null;
  case: Case | null;
}

/**
 * Check if CPU socket is compatible with Motherboard socket
 */
function checkCpuMotherboardCompatibility(
  cpu: Cpu | null,
  motherboard: Motherboard | null,
): CompatibilityIssue | null {
  if (!cpu || !motherboard) return null;

  if (!cpu.socket || !motherboard.socket) return null;

  if (cpu.socket !== motherboard.socket) {
    return {
      type: "cpu-motherboard",
      message: `CPUソケット「${cpu.socket}」とマザーボードの対応CPUソケット「${motherboard.socket}」に互換性がありません`,
      severity: "error",
    };
  }

  return null;
}

/**
 * Check if Memory standard is compatible with Motherboard memory support
 */
function checkMotherboardMemoryCompatibility(
  motherboard: Motherboard | null,
  memory: Memory | null,
): CompatibilityIssue | null {
  if (!motherboard || !memory) return null;

  if (!motherboard.memory || !memory.standard) return null;

  // Check if motherboard memory field contains the memory standard
  if (!motherboard.memory.includes(memory.standard)) {
    return {
      type: "motherboard-memory",
      message: `メモリの規格「${memory.standard}」はマザーボードの対応メモリ規格「${motherboard.memory}」と互換性がありません`,
      severity: "error",
    };
  }

  return null;
}

/**
 * Check if Motherboard form factor is compatible with Case supported motherboard form factors
 */
function checkMotherboardCaseCompatibility(
  motherboard: Motherboard | null,
  pcCase: Case | null,
): CompatibilityIssue | null {
  if (!motherboard || !pcCase) return null;

  if (!motherboard.form_factor || !pcCase.support_motherboard) return null;

  try {
    const supportedFormFactors = JSON.parse(
      pcCase.support_motherboard,
    ) as string[];

    if (!supportedFormFactors.includes(motherboard.form_factor)) {
      return {
        type: "motherboard-case",
        message: `マザーボードのフォームファクタ「${motherboard.form_factor}」はPCケースの対応フォームファクタ「${supportedFormFactors.join(", ")}」と互換性がありません`,
        severity: "error",
      };
    }
  } catch (error) {
    // If JSON parsing fails, we can't check compatibility
    return null;
  }

  return null;
}

/**
 * Check all compatibility issues for the selected parts
 */
export function checkAllCompatibility(
  selectedParts: SelectedParts,
): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];

  // Check CPU-Motherboard compatibility
  const cpuMotherboardIssue = checkCpuMotherboardCompatibility(
    selectedParts.cpu,
    selectedParts.motherboard,
  );
  if (cpuMotherboardIssue) {
    issues.push(cpuMotherboardIssue);
  }

  // Check Motherboard-Memory compatibility
  const motherboardMemoryIssue = checkMotherboardMemoryCompatibility(
    selectedParts.motherboard,
    selectedParts.memory,
  );
  if (motherboardMemoryIssue) {
    issues.push(motherboardMemoryIssue);
  }

  // Check Motherboard-Case compatibility
  const motherboardCaseIssue = checkMotherboardCaseCompatibility(
    selectedParts.motherboard,
    selectedParts.case,
  );
  if (motherboardCaseIssue) {
    issues.push(motherboardCaseIssue);
  }

  return issues;
}
