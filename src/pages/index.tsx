import type { NextPage } from "next";
import Head from "next/head";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>BMYC</title>
        <meta name="description" content="Bear Market Yacht Club" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Heading>Welcome to the Bear Market Yacht Club</Heading>
        <p>We provide the bear necessities during the bear market</p>
        <Button href="/mint">Mint!</Button>
      </Layout>
    </>
  );
};

export default Home;
