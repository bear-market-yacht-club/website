import { keccak256 } from "ethers/lib/utils";
import MerkleTree from "merkletreejs";
import { addressValidator } from "../../types/validators";
import { createRouter } from "./context";

export const mint = createRouter().query("merkle-proof", {
  input: addressValidator,
  async resolve({ input, ctx }) {
    const whitelistedAddresses = await ctx.prisma.whitelists.findMany();
    if (whitelistedAddresses) {
      const leafNodes = whitelistedAddresses.map((addr) =>
        keccak256(addr.address.toLowerCase())
      );
      const merkleTree = new MerkleTree(leafNodes, keccak256, {
        sortPairs: true,
      });

      const merkleProof = merkleTree.getHexProof(keccak256(input.ethAddress));
      const whitelisted = merkleTree.verify(
        merkleProof,
        keccak256(input.ethAddress),
        merkleTree.getHexRoot()
      );
      return { merkleProof, whitelisted };
    }
  },
});
