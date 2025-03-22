import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="auto">
      <Component {...pageProps} />
    </MantineProvider>
  );
}
