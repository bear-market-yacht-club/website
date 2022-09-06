import { FC, HTMLAttributes } from "react";

const Heading: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <h1
      {...props}
      className={`font-black text-3xl italic uppercase mb-8 ${props.className}`}
    >
      {props.children}
    </h1>
  );
};

export default Heading;
