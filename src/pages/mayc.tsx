import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { NextPage } from "next";
import mayc from "../files/mayc.json";
import Button from "../components/Button";
import { FormEventHandler, useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const MAYC: NextPage = () => {
  const [entryStatus, setEntryStatus] = useState<boolean | null>(null);
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setEntryStatus(false);
  };

  return (
    <Layout>
      <Heading>MAYC Giveaway</Heading>
      <div className="space-y-8">
        <Heading className="text-yellow">{Object.keys(mayc)[0]}</Heading>
        <div className="text-xl space-y-4">
          {mayc["ENTRY STEPS"].map((item, i) => (
            <div key={item}>
              <span className="text-3xl text-yellow mr-4">{alphabet[i]}.</span>
              <span dangerouslySetInnerHTML={{ __html: item }}></span>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-8">
            <p>Check entry status</p>
            <div className="flex items-center">
              <span className="text-yellow text-sm">@</span>
              <input name="entryStatus" className="text-lg" type="text" />
            </div>
            <Button>Check</Button>
          </div>
          {entryStatus === false && <div>Not accepted yet</div>}
        </form>
        <Heading className="text-yellow">{Object.keys(mayc)[1]}</Heading>
        <div className="text-xl space-y-4">
          {mayc["REQUIREMENTS"].map((item, i) => (
            <div key={item}>
              <span className="text-3xl text-yellow mr-4">{i + 1}.</span> {item}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MAYC;
