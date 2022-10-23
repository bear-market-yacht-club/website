import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | JSX.Element;
}

const Checkbox: FC<Props> = ({ label, checked, onChange, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        className="accent-yellow"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label className="">{label}</label>
    </div>
  );
};

export default Checkbox;
