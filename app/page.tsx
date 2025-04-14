"use client";

import { ThemeButton } from "@/components/ThemeButton";
import TotalPrice from "@/components/TotalPrice";
import classes from "@/styles/index.module.scss";
import pages from "@/utils/pages.json";
import {
  Anchor,
  AppShell,
  Burger,
  Button,
  Container,
  Flex,
  Group,
  Image,
  NavLink,
  Overlay,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { default as NextImage } from "next/image";
import Link from "next/link";
import background from "@/public/background.png";

const pageList = pages;

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 9999,
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} size="sm" />
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
        <NavLink
          key="build"
          label={<TotalPrice />}
          component={Link}
          href="/build"
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Flex direction="column" align="flex-start">
          <Image
            component={NextImage}
            src={background}
            width={800}
            height={800}
            priority={true}
            alt="背景画像"
            className={classes.image}
          />
          <Overlay
            color="#000"
            backgroundOpacity={0.5}
            blur={3}
            className={classes.overlay}
          />
          <Container>
            <Stack align="flex-start" pt="20vh">
              <Title className={classes.text}>最強の自作PCを手に入れよう</Title>
              <Text className={classes.text}>
                パーツの知識不要、最高の自作PCをあなたの手で作り上げましょう。
              </Text>
              <Button component={Link} href="/cpu" variant="primary">
                はじめる
              </Button>
            </Stack>
          </Container>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
