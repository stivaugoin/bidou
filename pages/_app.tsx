import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import Head from "next/head";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Bidou v3</title>
        <meta name="description" content="Manage your family budget" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          components: {
            Button: {
              defaultProps: {
                radius: "xl",
              },
            },
          },
        }}
      >
        <ModalsProvider>
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
