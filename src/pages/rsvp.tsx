import { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const RSVP: NextPage = () => {
  const [twitterHandle, setTwitterHandle] = useState("");
  const { data: hasTwitter } = trpc.useQuery([
    "form.getByTwitter",
    { twitterHandle },
  ]);
  const { mutate: applyMutation } = trpc.useMutation("track.rsvpTrack");
  const [checking, setChecking] = useState(0);

  useEffect(() => {
    let t = setTimeout(() => {
      return 0;
    }, 0);
    if (checking === 1) {
      t = setTimeout(() => {
        setChecking(hasTwitter ? 2 : 3);
      }, 3000);
    }
    return () => {
      clearTimeout(t);
    };
  }, [checking]);

  return (
    <Layout>
      <Heading>See if you&apos;re invited</Heading>
      <div className="text-yellow w-1/2">
        <p>Twitter Username</p>
        <div className="flex">
          <span className="">@</span>
          <input
            className="text-lg"
            type="text"
            value={twitterHandle}
            onChange={(value) => setTwitterHandle(value.target.value)}
          />
        </div>
        <div className="mt-8">
          {checking === 0 ? (
            <Button
              onClick={() => {
                applyMutation({ twitterHandle });
                setChecking(1);
              }}
            >
              Check Status
            </Button>
          ) : checking === 1 ? (
            <>
              <div className="boxes">
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="box">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <p className="mt-20 text-yellow">Checking Database</p>
            </>
          ) : checking === 2 ? (
            <div className="">
              <p className="mb-4 text-green-400">You have been chosen!</p>
              <Button href="https://www.premint.xyz/bear-market-yacht-club/">
                RSVP
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="mb-4 text-red-400">
                You are not invited at this time.
              </p>
              <Button href="/apply">Apply</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RSVP;
