import type { NextPage } from "next";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const About: NextPage = () => {
  return (
    <Layout>
      <Heading>Our Mission</Heading>
      <p className="mb-8">
        We will unify the people who are still here in the bear market, creating
        a solid web3 family that has fun, and will thrive and support each other
        in both good and bad times.
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
          <tr>55555</tr>
          <tr>Ethereum</tr>
          <tr>FREE!</tr>
          <tr>TBD</tr>
          <tr>Invite Only</tr>
        </td>
      </table>
      <Heading>Our Team</Heading>
      <div className="flex flex-wrap font-bold lg:w-1/2 mb-8 gap-4 items-center">
        <div className="flex flex-col items-center">
          <p className="card">
            <span>?</span>
          </p>
          <p>buidler</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="card">
            <span>?</span>
          </p>
          <p>cryptid</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="card">
            <span>?</span>
          </p>
          <p>memepool</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
