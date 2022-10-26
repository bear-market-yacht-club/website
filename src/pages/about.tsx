import type { NextPage } from "next";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const team: { username: string; description: string }[] = [
  {
    username: "web3buidler",
    description: "Captain Buidler",
  },
  {
    username: "cryptiddarkarts",
    description: "Secret Weapon",
  },
  {
    username: "memepool",
    description: "Conspirator",
  },
  {
    username: "pugngmi",
    description: "Botwrangler",
  },
  {
    username: "juda_eth",
    description: "Vibes Officer",
  },
  {
    username: "0xBIGBAD",
    description: "Memeologist",
  },
];

const About: NextPage = () => {
  return (
    <Layout>
      <Heading>Our Mission</Heading>
      <div className="lg:w-1/2">
        <p className="mb-8">
          We will unify as a web3 family in the bear market, having fun and
          supporting each other in both good and bad times.
        </p>
        <Heading>What is a bear?</Heading>
        <p className="mb-8">
          A bear is a unique ERC721 token living on the Ethereum Blockchain.
          Your bear is your yacht club access pass, and provides access to all
          exclusive club member areas.
        </p>
        <Heading>Mint Info</Heading>
        <div className="w-full mb-8 flex gap-4">
          <div className="flex-grow w-full font-bold text-yellow">
            <p>Supply</p>
            <p>Network</p>
            <p>Mint Price</p>
            <p>Max Mint Per Tx</p>
            <p>Free Mint Per Whitelist</p>
            <p>Mint Date</p>
          </div>
          <div className="">
            <p>5555</p>
            <p>Ethereum</p>
            <p>0.06 ETH</p>
            <p>10</p>
            <p>1</p>
            <p>October 26, 2022 2PM EST</p>
          </div>
        </div>
        <Heading>Crew Members</Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-cols-max content-start lg:w-max font-bold mb-7 gap-4">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col items-center justify-start">
              <p className="card">
                <div className="mx-auto w-[100px] h-[100px] relative">
                  <div className="absolute bottom-1 w-full h-full glow [mask:url('/images/bear-silhouette.png')]"></div>
                </div>
              </p>
              <p>@{member.username}</p>
              <p className="text-xs">{member.description}</p>
            </div>
          ))}
        </div>
        <Heading>Club Rules</Heading>
        <div>
          <ol className="list-decimal list-inside text-yellow">
            <li>
              <span className="text-white">Be nice</span>
            </li>
            <li>
              <span className="text-white">Don&apos;t be an asshole</span>
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default About;
