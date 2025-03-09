import { themeAtom } from "@/jotai/atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { BsMoonFill, BsPcDisplay, BsSunFill } from "react-icons/bs";

export function ThemeDropdown() {
  const [theme, setThemeAtom] = useAtom(themeAtom);

  useEffect(() => {
    let targetTheme = theme;

    if (theme === "default") {
      targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    if (targetTheme === "light") {
      document.documentElement.dataset.bsTheme = targetTheme;
    } else if (targetTheme === "dark") {
      document.documentElement.dataset.bsTheme = targetTheme;
    }
  }, [theme]);

  function setTheme(t: string) {
    if (t === "default") {
      const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.dataset.bsTheme = defaultTheme;
      setThemeAtom("default");
    } else if (t === "light") {
      document.documentElement.dataset.bsTheme = "light";
      setThemeAtom("light");
    } else if (t === "dark") {
      document.documentElement.dataset.bsTheme = "dark";
      setThemeAtom("dark");
    }
  }

  function ThemeIcon({ t }: { t: string }) {
    if (t === "default") {
      return <BsPcDisplay />;
    } else if (t === "light") {
      return <BsSunFill />;
    } else if (t === "dark") {
      return <BsMoonFill />;
    }
  }

  return (
    <>
      <NavDropdown title={<ThemeIcon t={theme} />}>
        <NavDropdown.Item onClick={() => setTheme("light")}>
          Light
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => setTheme("dark")}>
          Dark
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => setTheme("default")}>
          System
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}
