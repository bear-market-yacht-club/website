import { BigNumber, Contract } from "ethers";
import { useContractFunction, useCall } from "@usedapp/core";
import BMYC_ABI from "../abis/BMYC.json";

const bmyc = new Contract(
  "0xc6c0fA2D228d1d5FF483f410704A0913782ae9d7",
  BMYC_ABI
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

export function useIsMintUsed(address: string | undefined): number | undefined {
  const { value, error } =
    useCall(
      address && {
        contract: bmyc,
        method: "usedMint",
        args: [address],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value ? (value[0] as BigNumber).toNumber() : undefined;
}

export function useBMYCMethod(methodName: string) {
  const { state, send } = useContractFunction(bmyc, methodName, {});
  return { state, send };
}

export function useMint() {
  const { state, send } = useContractFunction(bmyc, "mint");
  return { state, send };
}
