import type { NextPage } from "next";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const Mint: NextPage = () => {
  const invitesClaimed = 100;

  return (
    <Layout>
      <Heading>Mint</Heading>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto w-[300px] h-[300px] lg:w-[300px] lg:h-[300px] relative">
          <div className="absolute w-full h-full glow [mask:url('/images/bear-silhouette.png')]"></div>
        </div>
        <div className="w-[75%] lg:w-1/4">
          <p className="italic text-center font-bold">Whitelist is Full</p>
          <div className="meter animate">
            <p className="">{invitesClaimed}%</p>
            <span style={{ width: `${invitesClaimed}%` }}>
              <span></span>
            </span>
          </div>
        </div>
        <div className="flex w-[75%] lg:w-1/4 justify-between">
          <Button
            href="https://www.premint.xyz/bear-market-yacht-club/"
            className="p-3 text-sm"
          >
            Premint
          </Button>
        </div>
        {/* <Button
          href="/apply"
          className="animate-[wiggle_3s_linear_infinite] glow-on-hover"
          disabled
        >
          Mint
        </Button>
        <p className="font-black text-xl">0/5555</p> */}
      </div>
    </Layout>
  );
};

export default Mint;
