import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const Mint: NextPage = () => {
  const { mutate: addEmail, status: emailStatus } =
    trpc.useMutation("mailing.addEmail");
  const emailRef = useRef<HTMLInputElement>(null);
  const [twitterHandle, setTwitterHandle] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const th = localStorage
      .getItem("twitter_handle")
      ?.toLowerCase()
      .trim()
      .replace(/^@+/, "")
      .trim();
    if (th) {
      localStorage.setItem("twitter_handle", th);
      setTwitterHandle(th);
    }
  }, []);

  const subscribe = () => {
    if (emailRef.current?.value) {
      addEmail({
        email: emailRef.current.value,
        twitterHandle,
      });
    }
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
        <Heading className="mb-1">
          <span className="text-yellow">Minting November 10</span>
        </Heading>
        <div>Enter your email to get notified of any updates</div>
        <div className="flex gap-4 text-xl">
          <input
            className=""
            ref={emailRef}
            placeholder="email@example.com"
            type="text"
          />
          <Button
            className="p-1 bg-transparent text-yellow border-2 !border-solid border-yellow"
            onClick={subscribe}
          >
            Submit
          </Button>
        </div>
        {emailStatus === "error" && <div>Invalid Email</div>}
        {emailStatus === "success" && <div>Submitted</div>}
        <a
          className="mt-4"
          href="https://www.premint.xyz/bmyc"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button>
            <span className="!no-underline">Whitelist</span>
          </Button>
        </a>
      </div>
    </Layout>
  );
};

export default Mint;
