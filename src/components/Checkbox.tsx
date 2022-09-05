import { ButtonHTMLAttributes, FC, useState } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Checkbox: FC<Props> = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <button
      className={`m-[calc(10px*2)] mx-auto uppercase bg-black border-yellow rounded-xl border-2 border-solid font-bold text-xl px-4 py-2 duration-300 select-none ${
        checked
          ? "text-yellow hover:bg-yellow hover:text-black"
          : "text-black hover:bg-yellow hover:text-yellow"
      } disabled:bg-[#ccc] disabled:text-[#666] min-h-[1em] min-w-[1em] ${
        props.className
      }`}
      onClick={(e) => {
        e.preventDefault();
        setChecked(!checked);
        if (props.onClick) props.onClick(e);
      }}
    >
      ✓{props.children}
    </button>
  );
};

export default Checkbox;
