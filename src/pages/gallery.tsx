import { useEthers } from "@usedapp/core";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { useContractMethod, useMint } from "../hooks";
import { wrap } from "../utils/wrap";

const Gallery: NextPage = () => {
  return (
    <Layout>
      <Heading>Gallery</Heading>
      <p className="mb-9">Bear with us.</p>
      <p>Will be live after mint.</p>
    </Layout>
  );
};

export default Gallery;
