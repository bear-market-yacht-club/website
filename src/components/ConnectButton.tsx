import { formatEther } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { ButtonHTMLAttributes } from "react";
import Button from "./Button";
import Identicon from "./Identicon";

export default function ConnectButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  return account ? (
    <div className="flex items-center justify-between rounded-xl bg-transparent border-2 border-white border-solid text-white min-w-max px-1">
      <Identicon />
      <div className="px-3 not-italic">
        {parseFloat(formatEther(etherBalance ?? 0)).toFixed(3)} ETH
      </div>
      <div className="font-bold ">
        {account &&
          `${account.slice(0, 6)}...${account.slice(
            account.length - 4,
            account.length
          )}`}
      </div>
    </div>
  ) : (
    <div className="flex items-center">
      <Button className="min-w-max" onClick={activateBrowserWallet} {...props}>
        Connect to Wallet
      </Button>
    </div>
  );
}
