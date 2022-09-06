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

      <Layout className="text-center">
        <Heading>Welcome to the Bear Market Yacht Club</Heading>
        <p className="mb-8">This website may be bare, but its a bear market.</p>
        <Button href="/apply">Apply</Button>
      </Layout>
    </>
  );
};

export default Home;
