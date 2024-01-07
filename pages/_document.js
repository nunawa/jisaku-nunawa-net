import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.9.0/sql-wasm.min.js"
          async
        />
        <link
          rel="preload"
          href="https://bucket.nunawa.net/parts_20230923_181511.db"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.9.0/sql-wasm.wasm"
          as="fetch"
          crossOrigin="anonymous"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
