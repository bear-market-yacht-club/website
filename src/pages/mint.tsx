import { useEthers } from "@usedapp/core";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { useContractMethod, useMint } from "../hooks";
import { wrap } from "../utils/wrap";

const Mint: NextPage = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [src, setSrc] = useState("/images/bmyc1.png");
  const { state: setMintState, send: setMint } = useContractMethod("mint");
  const { account } = useEthers();

  useEffect(() => {
    setTimeout(() => {
      setSrc(`/images/bmyc${currentImage}.png`);
      setCurrentImage(wrap(currentImage, 1, 1, 9));
    }, 500);
  }, [currentImage]);

  return (
    <Layout>
      <div className="py-10">
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64">
            <Image
              src={src}
              layout="fill"
              objectFit="contain"
              alt="example nfts"
            />
          </div>
          <div className="border-transparent border-[.5px] rounded-full">
            Already Minted: 0/16328
          </div>
          <div className="flex flex-col">
            {/* <NumberInput
                color="green.400"
                placeholder="Enter Amount to Mint  (Max 33)"
                defaultValue={0}
                max={33}
                value={mintAmount}
                onChange={(event) =>
                  setMintAmount(event ? Math.min(33, parseInt(event)) : 0)
                }
                clampValueOnBlur={false}
                type="number"
                variant="flushed"
              >
                <NumberInputField />
              </NumberInput> */}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {account ? (
            <p>Mint NFT&apos;s to your account: {account}</p>
          ) : (
            <p className="mb-6 text-red-400">Not Connected To Wallet</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={useMint}>Mint!</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Mint;
