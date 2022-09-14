import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const Mint: NextPage = () => {
  const totalInvites = 2000;
  const { data: inviteList } = trpc.useQuery(["premint.premintList"]);
  const [invitesClaimed, setInvitesClaimed] = useState(0);

  useEffect(() => {
    setInvitesClaimed(
      Math.round(((inviteList?.data.length ?? 0) / totalInvites) * 100)
    );
  }, [inviteList]);

  return (
    <Layout>
      <Heading>Mint</Heading>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto w-[300px] h-[300px] lg:w-[300px] lg:h-[300px] relative">
          <div className="absolute w-full h-full glow [mask:url('/images/bear-silhouette.png')]"></div>
        </div>
        <div className="w-[75%] lg:w-1/4">
          <p className="italic text-center font-bold">Invites Claimed</p>
          <div className="meter animate">
            <p className="">{invitesClaimed}%</p>
            <span style={{ width: `${invitesClaimed}%` }}>
              <span></span>
            </span>
          </div>
        </div>
        <p className="mb-4">Mint will open after invite period</p>
        <div className="flex w-[75%] lg:w-1/4 justify-between">
          <Button className="p-3 text-sm">Apply</Button>
          <Button className="p-3 text-sm">RSVP</Button>
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
