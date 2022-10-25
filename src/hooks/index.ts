import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useCall } from "@usedapp/core";
import NFTFactoryABI from "../abis/BMYC.json";

const factoryInterface = new ethers.utils.Interface(
  JSON.stringify(NFTFactoryABI)
);
const bmyc = new Contract(
  "0xF6e335db585B43a768FD3A450e858Ab5886E5Ba9",
  factoryInterface
);

export function useIsWhitelistUsed(
  address: string | undefined
): boolean | undefined {
  const { value, error } =
    useCall(
      address && {
        contract: bmyc,
        method: "usedWhitelist", // Method to be called
        args: [address], // Method arguments - address to be checked for balance
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export function useBMYCMethod(methodName: string) {
  const { state, send } = useContractFunction(bmyc, methodName, {});
  return { state, send };
}

export function useMint() {
  const { state, send } = useContractFunction(bmyc, "mint");
  return { state, send };
}
