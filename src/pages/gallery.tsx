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
      <Heading>Gallery</Heading>
      <p>Will be live after mint</p>
    </Layout>
  );
};

export default Mint;
