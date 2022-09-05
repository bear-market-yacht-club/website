import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Heading: FC<Props> = ({ children }) => {
  return (
    <h1 className="font-black text-3xl italic uppercase mb-8">{children}</h1>
  );
};

export default Heading;
