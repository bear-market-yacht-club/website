import type { NextPage } from "next";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const Memes: NextPage = () => {
  return (
    <Layout>
      <Heading>Memes (Bear Memes)</Heading>
      <div className="flex flex-col items-center gap-4"></div>
    </Layout>
  );
};

export default Memes;
