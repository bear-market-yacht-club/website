import { useEthers } from "@usedapp/core";
import Jazzicon from "react-jazzicon";

export default function Identicon() {
  const { account } = useEthers();

  return (
    <div className="mt-1 rounded-2xl">
      {account && (
        <Jazzicon diameter={32} seed={parseInt(account.slice(2, 10), 16)} />
      )}
    </div>
  );
}
