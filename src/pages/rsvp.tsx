import { NextPage } from "next";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const RSVP: NextPage = () => {
  return (
    <Layout>
      <Button href="https://www.premint.xyz/bear-market-yacht-club/">
        RSVP at Premint
      </Button>
    </Layout>
  );
};

export default RSVP;
