import { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="transition-all">
      <Header />
      <main className="container mx-auto max-w-10xl flex flex-col m-4 p-4 text-white bg-black">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
