import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-bs-theme="light">
      <Head />
      <body>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.min.js"
          async
        />
        <link
          rel="preload"
          href="https://bucket.nunawa.net/parts_latest.db"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.wasm"
          as="fetch"
          crossOrigin="anonymous"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
