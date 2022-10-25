import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useCall } from "@usedapp/core";
import NFTFactoryABI from "../abis/BMYC.json";

const factoryInterface = new ethers.utils.Interface(
  JSON.stringify(NFTFactoryABI)
);
const bmyc = new Contract(
  "0xae40f4D1CfeAf09bdd6348F2C0E9d7a5B03D3Dc0",
  factoryInterface
);

export function listenToEvents(
  contract: Contract,
  eventName: string,
  callback: (event: any) => void
) {
  contract.on(eventName, callback);
}

export function useBMYCMethod(methodName: string) {
  const { state, send } = useContractFunction(bmyc, methodName, {});
  return { state, send };
}

export function useMint() {
  const { state, send } = useContractFunction(bmyc, "mint");
  return { state, send };
}
