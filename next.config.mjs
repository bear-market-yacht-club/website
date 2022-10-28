import { withAxiom } from "next-axiom";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig(
  withAxiom({
    reactStrictMode: true,
    swcMinify: true,
    // redirects: () => [
    //   {
    //     source: "/apply",
    //     destination: "https://www.premint.xyz/bear-market-yacht-club/",
    //     permanent: true,
    //   },
    //   {
    //     source: "/rsvp",
    //     destination: "https://www.premint.xyz/bear-market-yacht-club/",
    //     permanent: true,
    //   },
    // ],
  })
);
