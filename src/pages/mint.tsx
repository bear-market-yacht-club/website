import { useEthers } from "@usedapp/core";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { useContractMethod, useMint } from "../hooks";
import { wrap } from "../utils/wrap";

const Mint: NextPage = () => {
  return (
    <Layout>
      <Heading>Mint</Heading>
      <p className="mb-8">This may be a bare website, but its a bear market.</p>
      <p>Will be live after invite period.</p>
    </Layout>
  );
};

export default Mint;
