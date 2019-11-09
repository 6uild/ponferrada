import { ChainId, TxCodec } from "@iov/bcp";

import { ChainSpec, getConfig } from "../config";
import { isGrafainSpec } from "./connection";
import { grafainCodec } from "@6uild/grafain";

export function getCodec(spec: ChainSpec): TxCodec {
  if (isGrafainSpec(spec)) {
    let grafainCodec1 = grafainCodec;
    return grafainCodec1;
  }
  throw new Error("Unsupported codecType for chain spec");
}

export async function getCodecForChainId(chainId: ChainId): Promise<TxCodec> {
  const chains = (await getConfig()).chains;
  const specificChain = chains.find(chain => chain.chainSpec.chainId === chainId);
  if (specificChain) {
    let codec = getCodec(specificChain.chainSpec);
    return codec;
  }

  throw new Error("No codec found or no active connection for this chainId");
}
