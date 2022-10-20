import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { NextPage } from "next";

const Date = ({ children }: { children?: string }) => {
  return <div className="font-bold">{children}</div>;
};
const Cell = ({
  top,
  bottom,
}: {
  top: string | JSX.Element;
  bottom: string | JSX.Element;
}) => {
  return (
    <div className="flex flex-col">
      <div className="text-4xl text-yellow font-black">{top}</div>
      <div className="font-normal italic">{bottom}</div>
    </div>
  );
};

const Roadmap: NextPage = () => {
  return (
    <Layout>
      <Heading>Club Schedule</Heading>
      <div className="grid gap-4 grid-cols-[1fr_2fr] lg:pr-24">
        <Date>October 26, 4:20 EST</Date>
        <Cell top="Mint Out!" bottom="" />
        <Date>⋮</Date>
        <Cell
          top="Art Reveal"
          bottom="24 hours after all NFTs have been minted, the art will be revealed!"
        />
        <Date></Date>
        <Cell
          top="Board the Yacht!"
          bottom={
            <div>
              Yacht Club Discord Channel Activation.
              <br />
              Channel will go live. This is BMYC&apos;s inner sanctum.
              <br />
              Only holders will be able to access this channel.
            </div>
          }
        />
        <Date></Date>
        <Cell
          top="Bear Giveaway"
          bottom="10 Bears will be given away to Yacht Club Members."
        />
        <Date></Date>
        <Cell
          top="Community Council Creation"
          bottom="The community will decide on its council."
        />
        <Date></Date>
        <Cell
          top="Radioactive Pancakes SNAPSHOTS"
          bottom={
            <>
              <div className="font-extrabold not-italic">
                A glowing stack of pancakes was found floating in the swamp.
                <br />
                Genetic Mutations have been rumored to occur in bears who eat
                them.
              </div>
              <div>
                We will perform a series of member snapshots at random times.
                <br />
                Members who are in all snapshots will qualify for the airdrop.
              </div>
            </>
          }
        />
        <Date></Date>
        <Cell top="Radioactive Pancakes Airdrop" bottom="" />
        <Date></Date>
        <Cell top="Bull Market Yacht Club Launch!" bottom="" />
      </div>
    </Layout>
  );
};

export default Roadmap;
