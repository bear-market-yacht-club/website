import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { NextPage } from "next";
import roadmap from "../files/roadmap.json";

const Date = ({ children }: { children?: string }) => {
  return <div className="font-bold">{children}</div>;
};
const Cell = ({ top, bottom }: { top: string; bottom: { __html: string } }) => {
  return (
    <div className="flex flex-col">
      <div className="text-4xl text-yellow font-black">{top}</div>
      <div className="font-normal italic" dangerouslySetInnerHTML={bottom} />
    </div>
  );
};

const Roadmap: NextPage = () => {
  return (
    <Layout>
      <Heading>Club Schedule</Heading>
      <div className="grid gap-4 grid-cols-[1fr_2fr] lg:pr-24">
        {roadmap.map((item) => (
          <>
            <Date>{item[2] || ""}</Date>
            <Cell top={item[0] || ""} bottom={{ __html: item[1] || "" }} />
          </>
        ))}
      </div>
    </Layout>
  );
};

export default Roadmap;
