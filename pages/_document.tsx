import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-bs-theme="light">
      <Head />
      <body>
        <link
          rel="preload"
          href="https://bucket.nunawa.net/parts_latest.db"
          as="fetch"
          crossOrigin="anonymous"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
