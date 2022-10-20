import { useEthers } from "@usedapp/core";
import { keccak256 } from "ethers/lib/utils";
import MerkleTree from "merkletreejs";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import SplitFlap from "../components/split-flap/SplitFlap";

function getMerkleTree(): MerkleTree {
  const whitelistedAddresses = [
    // "0xA556F41c30f363E90416Cf13ADEECf7187ACDBF2",
    "0xc00485651a10881dcdf2b37e906c7ab068b0d6de",
    "0xd8b75ad8d5fc7581dd3a383a1f80f20300968104",
    "0xc88fde95708e417ec5d1c6422cb8db5a3c06bac0",
    "0x76b2ebbb9eacac1376575b4f77d81457b3489fae",
    "0x2af6c93b3262103756b639267e5c66552c03769c",
    "0x691e6af6c68dc72284dd29217613164dc6f3f18e",
    "0x3d7e059a0805cee4ead6052725e2738275e873d2",
    "0xa161f0e1ee72ef12941d9dd6e75fe94c143076b8",
    "0xc52a7b9db11e8d2765ce7babf33e8af7f3628096",
    "0x24db8a0a16da2812b55af4d0f3a8ada8a68a330f",
    "0x76a6d7d4f8509440298182e48af3c38e82d47eed",
    "0x9e165350dafde5fafa5ede15e52eb1a578227264",
    "0x3cf00ce7083958b7b0c1c1ea3a79fddbb03b41a6",
    "0x06699d1d7ff4916dc4ae7e05701109b66b1ba8b7",
    "0x1afa21bef41b61b198b1782d4f806e163c8f291d",
    "0x4a6aa398f119156d2d5c3d47abb038876bd7bc00",
    "0xa15207145c4d7b338f4887808ae56c997e415388",
    "0xc251c3c6f001cb35561c210ccf1d5ea10f695be1",
    "0xa13965bc7b8003b4ce744c9aaf1c0dfcd1556da2",
    "0xcfed1304e9d594865e7416bb749d87a56ab13c85",
    "0x1a5ea1deadadea78c999a63536df1327cbfc14d4",
    "0x424a1088e10e7a1a190005f232bc46f67c63f10c",
    "0xc87ca6ed6bef6e3ac1693c50befa354beec7f046",
    "0x087ed99eebf62c3424b106834bf424d44632dd59",
    "0xe48864f7a66aef54a2374b741e4ae6bf20ec715b",
    "0x46b230f9277ea279fbba94824aad9242f95b8182",
    "0xd93f1d7cd6b1b3b8dd0272fc1e793836ab36dddc",
    "0xef435ecdf8f55478038fae815861804fb946a160",
    "0x3e2ad16c7b7325193b0dd372045c1893fc1bccea",
    "0xf6a60b7f4b5e9e7a2e3e06cb8a658cc9ea5e78e8",
    "0x6d6978f82906cf7bd0a5f6c7f22911516ff5f381",
    "0x70715011a164fc0b356ed7ffae2ad7d0dd238950",
    "0xb0ba79639a5c735c6f34d4393d0704cd5a3fd090",
    "0x5914446e411a6e7fba0cae7b3b1367a43d2e09c9",
    "0x7607173cee0e10f0b26409454844b2cdd55145a3",
    "0x48ff5b31006022e2846e3c4f2aebb8a26d3112aa",
    "0x7252fdc3c60736962f635dff57607534ff04f3f8",
    "0x93ec6448bc89b871492b0fac1b7e57a581f6428c",
    "0xe07770dcf6f2d2e8ef279e9698bfea4392d57f46",
    "0x12da352013d356e2be5ff8e4d2f9e1a74bff0fb2",
    "0x95e5d9cb7f6dedd614e85adf9175505a4145496c",
    "0x9807ececa310e31ba8e71316432fe4836b45da32",
    "0x9beba0d0f2cb869984fda0549c626223743fe591",
    "0x08c91628cd16918ce969fc451f82d5c27417b84d",
    "0x8e993c84e35f4f4fad262b6190d96e1d6242bb47",
    "0x9b9cc63626692b73b65b315cb586a7b543d3391f",
    "0x703c68c648a9a94510f0c0fa4d0130ff3fd3d0b2",
    "0x75c4b4fca59c79528318ec5ed04a94676fb17ecf",
    "0x26852f5184f188e9f0c4551fdd25c37391c10bad",
    "0x9bc40a1d8d6c73f30cbe912808c15c1d1a5ebf9e",
    "0x335a3ba013c75855e6a536deb0ec8cc35116f97f",
    "0x88d056bd8bcd053d52162187d65d4af998490b1e",
    "0xced58886dedd2bdb5961e4ed2047b36ebb8c218b",
    "0xc24ccad052c632149f817676c89751a8c57fa779",
  ];
  const leafNodes = whitelistedAddresses.map((addr) => keccak256(addr));
  return new MerkleTree(leafNodes, keccak256, {
    sortPairs: true,
  });
}

function getMerkleProof(addr: string): string[] {
  return getMerkleTree().getHexProof(keccak256(addr));
}

const Mint: NextPage = () => {
  const { account } = useEthers();
  const [whitelisted, setWhitelisted] = useState<boolean | null>(null);

  useEffect(() => {
    if (account) {
      const proof = getMerkleProof(account);
      const merkleTree = getMerkleTree();
      setWhitelisted(
        merkleTree.verify(proof, keccak256(account), merkleTree.getHexRoot())
      );
    }
  }, [account]);

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
        <div className="-mt-8 scale-50 md:scale-100">
          <SplitFlap />
          {/* October 26 4:20pm EST */}
        </div>
        <div className="flex flex-col w-[75%] lg:w-1/4 gap-4 justify-between items-center text-center">
          {whitelisted === null ? (
            <p>
              Check if you&apos;re whitelisted by connecting your MetaMask
              wallet
            </p>
          ) : whitelisted === false ? (
            <p>You are not whitelisted</p>
          ) : (
            <p>You have been whitelisted!</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Mint;
