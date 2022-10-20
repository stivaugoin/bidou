import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

export default function App(
  props: AppProps<{
    session: Session;
  }>
) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Bidou</title>
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
          <SWRConfig
            value={{
              fetcher: async (url) => {
                const res = await fetch(url);
                if (!res.ok) {
                  throw new Error("An error occurred while fetching the data.");
                }
                return res.json();
              },
            }}
          >
            <NotificationsProvider>
              <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
              </SessionProvider>
            </NotificationsProvider>
          </SWRConfig>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
