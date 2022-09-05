import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useCall } from "@usedapp/core";
import NFTFactoryABI from "../abis/BMYC.json";

const factoryInterface = new ethers.utils.Interface(
  JSON.stringify(NFTFactoryABI)
);
const factoryContract = new Contract(
  "0x5bf5bcc5362f88721167c1068b58c60cad075aac",
  factoryInterface
);

export function listenToEvents(
  contract: Contract,
  eventName: string,
  callback: (event: any) => void
) {
  contract.on(eventName, callback);
}
export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(factoryContract, methodName, {});
  return { state, send };
}

export function useMint() {
  const { state, send } = useContractFunction(factoryContract, "mint", {});
  return { state, send };
}
