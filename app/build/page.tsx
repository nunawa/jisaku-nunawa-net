"use client";

import BuildMain from "@/components/BuildMain";
import { ThemeButton } from "@/components/ThemeButton";
import TotalPrice from "@/components/TotalPrice";
import pages from "@/utils/pages.json";
import { Anchor, AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const pageList = pages;

export default function Page() {
  const [opened, { toggle }] = useDisclosure();

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
          <ThemeButton />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {pageList.map((x) => (
          <NavLink
            key={x.key}
            label={x.name}
            component={Link}
            href={`/${x.key}`}
          />
        ))}
        <NavLink key="build" label={<TotalPrice />} active />
      </AppShell.Navbar>
      <AppShell.Main>
        <BuildMain />
      </AppShell.Main>
    </AppShell>
  );
}
