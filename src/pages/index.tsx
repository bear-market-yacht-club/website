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
      <div className="mx-auto w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] relative">
        <div className="absolute w-full h-full glow [mask:url('/images/logo-mask.svg')]"></div>
        <img
          src="/images/logo-black.svg"
          className="absolute w-full h-full"
          alt="BMYC logo"
        />
      </div>
      <Button
        // href="/apply"
        href="/mint"
        className="animate-[wiggle_3s_linear_infinite] glow-on-hover"
      >
        Mint
      </Button>
    </Layout>
  );
};

export default Home;
