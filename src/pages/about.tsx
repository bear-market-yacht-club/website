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
        <Heading>Mint Info</Heading>
        <table className="lg:w-1/2 mb-8">
          <td className="font-bold text-yellow">
            <tr>Supply</tr>
            <tr>Network</tr>
            <tr>Mint Price</tr>
            <tr>Mint Date</tr>
            <tr>Whitelist</tr>
          </td>
          <td>
            <tr>5555</tr>
            <tr>Ethereum</tr>
            <tr>FREE!</tr>
            <tr>TBD</tr>
            <tr>Invite Only</tr>
          </td>
        </table>
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
