import { NextPage } from "next";
import { useState } from "react";
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

  return (
    <Layout>
      <div className="w-1/2">
        <Heading>Check your invite status</Heading>
        <p>Twitter Username</p>
        <div className="flex">
          <span className="text-yellow">@</span>
          <input
            className="text-lg"
            type="text"
            value={twitterHandle}
            onChange={(value) => setTwitterHandle(value.target.value)}
          />
        </div>
        <div className="mt-8">
          <Button
            disabled={!hasTwitter}
            href="https://www.premint.xyz/bear-market-yacht-club/"
          >
            {hasTwitter ? "RSVP!" : "RSVP"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default RSVP;
