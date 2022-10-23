import { FC, HTMLAttributes } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props extends HTMLAttributes<HTMLDivElement> {
  mainClassName?: string;
}

const Layout: FC<Props> = (props) => {
  return (
    <div
      {...props}
      className={`transition-all h-full flex flex-col ${props.className}`}
    >
      <Header />
      <main
        className={`flex-grow flex-shrink-0 container mx-auto max-w-10xl flex flex-col m-4 p-4 text-white bg-black ${props.mainClassName}`}
      >
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
