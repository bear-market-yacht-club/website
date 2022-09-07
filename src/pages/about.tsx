import type { NextPage } from "next";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const About: NextPage = () => {
  return (
    <Layout>
      <Heading>Our Mission</Heading>
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
      <Heading>Our Team</Heading>
      <div className="grid grid-cols-2 content-start lg:w-1/2 font-bold mb-8 gap-4">
        <div className="flex flex-col items-center justify-center">
          <p className="card">
            <span>?</span>
          </p>
          <p>@web3buidler</p>
          <p className="text-xs">Dev/Buidler in Chief</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="card">
            <span>?</span>
          </p>
          <p>@cryptiddarkarts</p>
          <p className="text-xs">Dev/Secret Weapon</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="card">
            <span>?</span>
          </p>
          <p>@memepool</p>
          <p className="text-xs">Chief Conspiracy Theorist</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
