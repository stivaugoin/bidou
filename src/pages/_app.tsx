import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { CategoriesProvider } from "../contexts/CategoriesContext";
import { defaultProps } from "../lib/mantine";
import { trpc } from "../lib/trpc";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "../styles/globals.css";

fontAwesomeConfig.autoAddCss = false;

export default trpc.withTRPC(function App(
  props: AppProps<{ session: Session }>
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
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <MantineProvider
        defaultColorScheme="dark"
        theme={{
          components: {
            Button: { defaultProps: defaultProps.Button },
            DatePicker: { defaultProps: defaultProps.Input },
            NumberInput: { defaultProps: defaultProps.Input },
            Select: { defaultProps: defaultProps.Input },
            Table: { defaultProps: defaultProps.Table },
            Textarea: { defaultProps: defaultProps.Input },
            TextInput: { defaultProps: defaultProps.Input },
          },
          other: {
            border: "1px solid #373A40",
          },
        }}
      >
        <ModalsProvider>
          <CategoriesProvider>
            <Notifications />
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </CategoriesProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
});
