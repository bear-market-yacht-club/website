import { useEthers } from "@usedapp/core";
import { compareAsc, intervalToDuration } from "date-fns";
import { utils } from "ethers";
import { keccak256 } from "ethers/lib/utils";
import MerkleTree from "merkletreejs";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { useMint } from "../hooks";
import { trpc } from "../utils/trpc";

const TimeSlot = ({ unit, amount }: { unit: string; amount?: number }) => {
  return (
    <div className="text-center min-w-20">
      <div className="font-black text-8xl md:text-6xl">{amount}</div>
      <div className="uppercase text-2xl md:text-lg">{unit}</div>
    </div>
  );
};

const Mint: NextPage = () => {
  const { account } = useEthers();
  const [agreed, setAgreed] = useState(false);
  const [mintDuration, setMintDuration] = useState<Duration>();
  const [quantity, setQuantity] = useState(0);
  const { send, state } = useMint();
  const { data: whitelistedAddresses } = trpc.useQuery(["mint.whitelists"]);
  const [mintTime, setMintTime] = useState(false);

  const proof = getMerkleProof(account || "0x");
  const merkleTree = getMerkleTree();
  const whitelisted = merkleTree.verify(
    proof,
    keccak256(account || "0x"),
    merkleTree.getHexRoot()
  );

  function getMerkleTree(): MerkleTree {
    if (whitelistedAddresses) {
      const leafNodes = whitelistedAddresses.map((addr) =>
        keccak256(addr.address.toLowerCase())
      );
      return new MerkleTree(leafNodes, keccak256, {
        sortPairs: true,
      });
    } else {
      return new MerkleTree([], "");
    }
  }

  function getMerkleProof(addr: string): string[] {
    return getMerkleTree().getHexProof(keccak256(addr));
  }

  useEffect(() => {
    const setDuration = () => {
      const d = intervalToDuration({
        start: new Date(),
        end: new Date("2022-10-26T20:20:00"),
      });

      setMintDuration(d);
      setMintTime(
        compareAsc(new Date("2022-10-26T20:20:00"), new Date()) === -1
      );
    };
    setDuration();
    const intervalId = setInterval(() => {
      setDuration();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onMint = () => {
    send(quantity, proof, {
      value: utils.parseEther(
        (0.06 * (quantity - (whitelisted ?? false ? 1 : 0))).toString()
      ),
      gasLimit: 200000,
    });
  };

  const onQuantityChange = (value: ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(value.currentTarget.value) || 0;
    newQuantity = Math.max(0, newQuantity);
    newQuantity = Math.min(10, newQuantity);
    setQuantity(newQuantity);
  };

  return (
    <Layout>
      <Heading>Mint</Heading>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto relative">
          <Image
            src="/images/bears.gif"
            width={300}
            height={300}
            alt="bears preview"
          />
        </div>
        <Heading>Minting:</Heading>
        <div className="-mt-12 md:-mt-8 scale-50 gap-12 md:scale-100 flex">
          <TimeSlot unit="days" amount={mintDuration?.days} />
          <TimeSlot unit="hours" amount={mintDuration?.hours} />
          <TimeSlot unit="minutes" amount={mintDuration?.minutes} />
          <TimeSlot unit="seconds" amount={mintDuration?.seconds} />
        </div>
        <div className="md:mt-8 flex flex-col w-[75%] lg:w-1/4 gap-4 justify-between items-center text-center">
          {whitelisted === null ? (
            <p>
              Check if you&apos;re whitelisted by connecting your MetaMask
              wallet
            </p>
          ) : whitelisted === true ? (
            <p>You have been whitelisted!</p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <div>
            <Checkbox
              checked={agreed}
              onChange={() => setAgreed((prev) => !prev)}
              label={
                <span>
                  Check to agree to the{" "}
                  <Link href="/tos.txt">Terms of Service</Link> and{" "}
                  <Link href="/privacy-policy.txt">Privacy Policy</Link>
                </span>
              }
            />
          </div>
          {!agreed && (
            <div>
              You must agree to the Terms of Service and Privacy Policy to mint
            </div>
          )}
          {state.status === "None" ? (
            <div>
              <div className="flex gap-8">
                <div className="flex items-stretch text-yellow">
                  <input
                    className="bg-black border-b-yellow border-b-2 w-12 text-3xl text-center"
                    defaultValue={0}
                    min={1}
                    max={10}
                    value={quantity}
                    type="number"
                    onChange={onQuantityChange}
                  />
                  <div className="flex flex-col w-6">
                    <svg
                      className="flex-grow cursor-pointer"
                      onClick={() =>
                        setQuantity((prev) => Math.min(10, prev + 1))
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#bfc500"
                        d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                      />
                    </svg>
                    <svg
                      className="flex-grow cursor-pointer"
                      onClick={() =>
                        setQuantity((prev) => Math.max(0, prev - 1))
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#bfc500"
                        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                      />
                    </svg>
                  </div>
                </div>
                <Button
                  onClick={onMint}
                  disabled={!agreed || whitelisted !== true || !mintTime}
                >
                  Mint
                </Button>
              </div>
              {!mintTime ? (
                <div className="mt-4 text-red-500">Not minting time yet</div>
              ) : (
                !account &&
                agreed && (
                  <div className="mt-4 text-red-500">
                    Connect wallet to mint
                  </div>
                )
              )}
            </div>
          ) : state.status === "Mining" ||
            state.status === "PendingSignature" ? (
            <div className="text-yellow">Confirming Transaction</div>
          ) : state.status === "Success" ? (
            <div className="text-green-400">Success!</div>
          ) : (
            <div className="text-red-500">Unknown error occured</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Mint;
