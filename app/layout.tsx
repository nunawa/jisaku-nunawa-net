import "@mantine/core/styles.css";

import React from "react";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";

export const metadata = {
  title: "jisaku.nunawa.net",
  description:
    "最新のPCパーツ情報で自作PC構成をシミュレーション＆見積もり。価格比較も可能な、自作PCユーザーのための支援サイト。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link
          rel="preload"
          href="https://bucket.nunawa.net/parts_latest.db"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={new URL(
            "sql.js/dist/sql-wasm.wasm",
            import.meta.url,
          ).toString()}
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  );
}
