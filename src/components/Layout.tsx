import { FC, HTMLAttributes } from "react";
import Header from "./Header";

interface Props extends HTMLAttributes<HTMLDivElement> {
  mainClassName?: string;
}

const Layout: FC<Props> = (props) => {
  return (
    <div {...props} className={`transition-all ${props.className}`}>
      <Header />
      <main
        className={`container mx-auto max-w-10xl flex flex-col m-4 p-4 text-white bg-black ${props.mainClassName}`}
      >
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
