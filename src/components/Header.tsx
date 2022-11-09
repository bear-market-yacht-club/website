import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import ConnectButton from "./ConnectButton";

const links: {
  href: string;
  src: string;
}[] = [
  { href: "https://www.discord.gg/28x4ysCtXW", src: "discord.svg" },
  { href: "https://www.twitter.com/bearmarketyc", src: "twitter.svg" },
  // {
  //   href: "https://opensea.io/collection/bear-market-yacht-club",
  //   src: "opensea.svg",
  // },
];
const pages = [
  { title: "Home", route: "/", hidden: true },
  { title: "Fudballs", route: "/fudballs" },
  { title: "Flappy Bear", route: "/flap" },
  { title: "Gallery", route: "/gallery" },
  { title: "Bemes", route: "/bemes" },
  { title: "Newsletter", route: "https://www.getrevue.co/profile/0xmemepool" },
  { title: "Mint", route: "/mint" },
  { title: "Club Schedule", route: "/roadmap" },
  { title: "About", route: "/about" },
];
const Header: FC = ({}) => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <header className="text-white bg-black p-4 relative z-10">
      <Head>
        <title>
          BMYC |{" "}
          {pages.filter((p) => p.route === router.pathname)[0]?.title || ""}
        </title>
      </Head>
      <nav className="relative flex items-center justify-between transition duration-500">
        <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:items-center">
            <Link href="/">
              {router.pathname === "/" ? (
                <span className="font-black italic text-3xl tracking-[.2em]">
                  BMYC
                </span>
              ) : (
                <img
                  className="max-w-[201px] cursor-pointer mr-8"
                  src="/images/logo-full.png"
                  alt="bmyc logo with bear skull"
                />
              )}
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none block lg:hidden outline-none focus:outline-none"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              ☰
            </button>
          </div>
          <div
            className={
              "italic font-medium text-xs tracking-widest uppercase ml-auto flex "
            }
          >
            <ul
              className={
                "flex-col text-end ml-auto gap-4 list-none lg:flex-row lg:items-center duration-300 origin-top lg:scale-y-100 " +
                (navbarOpen
                  ? "flex scale-y-100 h-auto"
                  : "h-0 lg:flex scale-y-0")
              }
            >
              {[
                ...pages
                  .filter((page) => !page.hidden)
                  .map((page) => (
                    <li
                      key={page.route}
                      className={`${
                        router.pathname === page.route
                          ? "text-yellow font-bold"
                          : "text-white hover:text-yellow"
                      }`}
                    >
                      <Link href={page.route}>
                        <span className="!no-underline cursor-pointer not-italic">
                          {page.title}
                        </span>
                      </Link>
                    </li>
                  )),
                (() => {
                  return (
                    <div className="flex flex-col lg:flex-row w-full">
                      <ConnectButton className="text-sm min-w-max" />
                      <div className="flex items-center justify-between mt-4 lg:mt-0 mx-4 lg:ml-10 gap-4">
                        {links.map((link) => (
                          <div
                            key={link.src}
                            className="cursor-pointer relative h-6 w-6 lg:h-4 lg:w-4"
                            onClick={() => router.push(link.href)}
                          >
                            <Image
                              src={`/images/${link.src}`}
                              layout="fill"
                              objectFit="contain"
                              alt={link.src}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })(),
              ]}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
