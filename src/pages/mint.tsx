import type { NextPage } from "next";
import Image from "next/image";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import SplitFlap from "../components/split-flap/SplitFlap";

const Mint: NextPage = () => {
  return (
    <Layout>
      <Heading>Mint</Heading>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto relative">
          <Image
            src="/images/bears.gif"
            width={300}
            height={300}
            alt="bears preview"
          />
        </div>
        <Heading>Minting:</Heading>
        <div className="mx-auto -mt-8">
          <SplitFlap />
          {/* October 26 4:20pm EST */}
        </div>
        <div className="flex w-[75%] lg:w-1/4 justify-between">
          <Button
            href="https://www.premint.xyz/bear-market-yacht-club/"
            className="p-3 text-sm"
          >
            Premint
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Mint;
