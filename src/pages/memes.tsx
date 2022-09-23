import type { NextPage } from "next";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const Memes: NextPage = () => {
  return (
    <Layout>
      <Heading>Memes (Bear Memes)</Heading>
      <p className="mb-8">This may be a bare page, but its a bear market.</p>
      <p>Will be live soon.</p>
    </Layout>
  );
};

export default Memes;
