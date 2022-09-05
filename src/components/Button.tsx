import { useRouter } from "next/router";
import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

const Button: FC<Props> = ({ href, children, ...rest }) => {
  const router = useRouter();
  return (
    <button
      {...rest}
      className={`mx-auto uppercase bg-[#bfc500] rounded-xl text-black border-none font-bold text-xl p-4 duration-300 hover:bg-white disabled:bg-[#ccc] disabled:text-[#666] ${rest.className}`}
      onClick={(event) => {
        if (rest.onClick) rest.onClick(event);
        if (href) router.push(href);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
