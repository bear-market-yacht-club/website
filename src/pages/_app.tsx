// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { Config, DAppProvider, Goerli, Mainnet, Mumbai } from "@usedapp/core";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import Router from "next/router";
import Script from "next/script";
import superjson from "superjson";
import type { AppRouter } from "../server/router";
import "../styles/globals.css";
import { isProduction } from "../types/generic";
import * as gtag from "../types/gtag";
import "react-responsive-modal/styles.css";

const DAppConfig: Config = {
  // readOnlyChainId: Mainnet.chainId,
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/b04d2052bb564fe1b7013bd024f9c8ba",
    [Goerli.chainId]:
      "https://goerli.infura.io/v3/b04d2052bb564fe1b7013bd024f9c8ba",
  },
};

if (isProduction) {
  Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
}

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Bear Market Yacht Club</title>
      </Head>
      {/* enable analytics script only for production */}
      {isProduction && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_TRACKING_ID}');
        `}
          </Script>
        </>
      )}
      <DAppProvider config={DAppConfig}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </DAppProvider>
    </>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
