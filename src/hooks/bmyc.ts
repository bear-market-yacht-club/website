import { BigNumber, Contract } from "ethers";
import { useContractFunction, useCall } from "@usedapp/core";
import BMYC_ABI from "../abis/BMYC.json";

const bmyc = new Contract(
  "0xAA7Bd578Ade85827487877904888Af1C75Ce7BEe",
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

export function useIsWhitelistUsed(
  address: string | undefined
): boolean | undefined {
  const { value, error } =
    useCall(
      address && {
        contract: bmyc,
        method: "usedWhitelist",
        args: [address],
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
