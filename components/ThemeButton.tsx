import {
  ActionIcon,
  Box,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export function ThemeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Tooltip
      label={computedColorScheme === "light" ? "ライトモード" : "ダークモード"}
    >
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        <Box darkHidden>
          <BsSunFill />
        </Box>
        <Box lightHidden>
          <BsMoonFill />
        </Box>
      </ActionIcon>
    </Tooltip>
  );
}
