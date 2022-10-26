import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

const links: {
  href: string;
  src: string;
}[] = [
  { href: "https://www.discord.gg/28x4ysCtXW", src: "discord.svg" },
  { href: "https://www.twitter.com/bearmarketyc", src: "twitter.svg" },
  {
    href: "https://opensea.io/collection/bear-market-yacht-club",
    src: "opensea.svg",
  },
];

const Footer: FC = ({}) => {
  const router = useRouter();

  return (
    <footer className="text-white bg-black px-4 lg:px-40 py-12 flex-shrink-0">
      <hr />
      <div className="w-full flex flex-col md:flex-row items-center gap-8 justify-between pt-6">
        <div className="">
          <Link href="/">
            <img
              className="max-w-[201px] cursor-pointer"
              src="/images/logo-full.png"
              alt="bmyc logo with bear skull"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <div className="flex gap-8 mb-2">
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
          <div>
            <Link href="/tos.txt">Terms of Service</Link>
          </div>
          <div>
            <Link href="/privacy-policy.txt">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
