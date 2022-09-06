import { FC, HTMLAttributes } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={`transition-all ${props.className}`}>
      <Header />
      <main className="container mx-auto max-w-10xl flex flex-col m-4 p-4 text-white bg-black">
        {props.children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
