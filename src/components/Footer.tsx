import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React, { FC } from "react";
import Button from "./Button";

const Footer: FC = ({}) => {
  const router = useRouter();
  return (
    <footer className="bg-black relative z-10">
      <hr className="text-gray-300 w-3/4 mx-auto" />
      <div className="flex flex-col mx-auto items-center justify-center mt-8"></div>
    </footer>
  );
};

export default Footer;
