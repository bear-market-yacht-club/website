import { keccak256 } from "ethers/lib/utils";
import MerkleTree from "merkletreejs";
import { log } from "next-axiom";
import { addressValidator } from "../../types/validators";
import { createRouter } from "./context";

export const mint = createRouter()
  .query("merkle-proof-holder", {
    input: addressValidator,
    async resolve({ input, ctx }) {
      return getWhitelist(
        await ctx.prisma.whitelists_current_holders.findMany(),
        input
      );
    },
  })
  .query("merkle-proof", {
    input: addressValidator,
    async resolve({ input, ctx }) {
      return getWhitelist(await ctx.prisma.whitelists.findMany(), input);
    },
  });

function getWhitelist(
  whitelistedAddresses: { address: string }[],
  input: { ethAddress: string }
) {
  if (whitelistedAddresses) {
    const leafNodes = whitelistedAddresses.map(
      ({ address }: { address: string }) => keccak256(address.toLowerCase())
    );
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });

    const addrHash = keccak256(input.ethAddress.toLowerCase());
    const merkleProof = merkleTree.getHexProof(addrHash);
    const whitelisted = merkleTree.verify(
      merkleProof,
      addrHash,
      merkleTree.getHexRoot()
    );
    log.debug(
      `${
        input.ethAddress
      }: ${merkleProof} ${whitelisted} ${merkleTree.getHexRoot()}`
    );
    return { merkleProof, whitelisted };
  }
}
