import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

export default function Document() {
  return (
    <Html lang="en" data-bs-theme="light" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
