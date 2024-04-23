import "@/styles/globals.css";
import "@/styles/highlight-github-dark.css";

import { DefaultLayout } from "@/components/layout";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return <DefaultLayout>{page}</DefaultLayout>;
    });

  // Return the custom layout, or default to the site header and global footer
  return getLayout(<Component {...pageProps} />);
}
