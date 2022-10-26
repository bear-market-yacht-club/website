import { formatEther } from "@ethersproject/units";
import { Goerli, useEtherBalance, useEthers } from "@usedapp/core";
import { ButtonHTMLAttributes } from "react";
import Button from "./Button";
import Identicon from "./Identicon";

export default function ConnectButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { chainId, activateBrowserWallet, account, switchNetwork } =
    useEthers();
  const etherBalance = useEtherBalance(account);

  return account && Goerli.chainId === chainId ? (
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
      <Button
        className="min-w-max"
        onClick={() => {
          !account ? activateBrowserWallet() : switchNetwork(Goerli.chainId);
        }}
        {...props}
      >
        {!account ? "Connect to Wallet" : "Switch to Ethereum"}
      </Button>
    </div>
  );
}
