import { keccak256 } from "ethers/lib/utils";
import MerkleTree from "merkletreejs";
import { addressValidator } from "../../types/validators";
import { createRouter } from "./context";

export const mint = createRouter().query("merkle-proof", {
  input: addressValidator,
  async resolve({ input, ctx }) {
    return { merkleProof: [], whitelisted: false };
  },
});
