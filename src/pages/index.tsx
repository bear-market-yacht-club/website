import type { NextPage } from "next";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout className="text-center">
      <Heading>Welcome to the Bear Market Yacht Club</Heading>
      <p className="mb-8">
        An exclusive club of 5555 unique bears sailing through Ethereum.
      </p>
      <div className="mb-8">
        <img src="/images/banner.png" />
      </div>
      <Button
        href="/mint"
        className="animate-[wiggle_3s_linear_infinite] glow-on-hover"
      >
        Mint
      </Button>
    </Layout>
  );
};

export default Home;
