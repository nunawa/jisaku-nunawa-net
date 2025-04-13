"use client";

import { ThemeDropdown } from "@/components/ThemeDropdown";
import TotalPrice from "@/components/TotalPrice";
import pages from "@/utils/pages.json";
import { Anchor, AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Anchor
              fw={500}
              fz="xl"
              underline="never"
              inherit={true}
              style={{ color: "var(--mantine-color-text)" }}
              component={Link}
              href="/"
            >
              jisaku.nunawa.net
            </Anchor>
          </Group>
          <ThemeDropdown />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {pages.map((x) => {
          if (x.key === pathname.slice(1)) {
            return <NavLink key={x.key} label={x.name} active />;
          } else {
            return (
              <NavLink
                key={x.key}
                label={x.name}
                component={Link}
                href={`/${x.key}`}
                onClick={() => close()}
              />
            );
          }
        })}
        <NavLink
          key="build"
          label={<TotalPrice />}
          component={Link}
          href="/build"
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
