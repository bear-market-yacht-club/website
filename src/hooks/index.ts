import { BigNumber, ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useCall } from "@usedapp/core";
import NFTFactoryABI from "../abis/BMYC.json";

const factoryInterface = new ethers.utils.Interface(
  JSON.stringify(NFTFactoryABI)
);
const bmyc = new Contract(
  "0x8e6F6a11E33375076FC76Bdb30FE218f588E5749",
  factoryInterface
);

export function useTotalSupply(): number | undefined {
  const { value, error } =
    useCall({
      contract: bmyc,
      method: "totalSupply", // Method to be called
      args: [], // Method arguments - address to be checked for balance
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value ? (value[0] as BigNumber).toNumber() : undefined;
}

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
