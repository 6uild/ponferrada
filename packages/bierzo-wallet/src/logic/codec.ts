import { ChainId, TxCodec } from "@iov/bcp";

import { ChainSpec, getConfig } from "../config";
import { isGrafainSpec } from "./connection";
import { grafainCodec } from "@6uild/grafain";

export function getCodec(spec: ChainSpec): TxCodec {
  console.log("++getCodec-spec:", spec);
  if (isGrafainSpec(spec)) {
    let grafainCodec1 = grafainCodec;
    console.log("++getCodec-grafainCodec:", grafainCodec1);

    return grafainCodec1;
  }
  throw new Error("Unsupported codecType for chain spec");
}

export async function getCodecForChainId(chainId: ChainId): Promise<TxCodec> {
  const chains = (await getConfig()).chains;
  const specificChain = chains.find(chain => chain.chainSpec.chainId === chainId);
  console.log("++ specifiChain: ", specificChain);
  if (specificChain) {
    let codec = getCodec(specificChain.chainSpec);
    console.log("++ specifiChain-codec: ", codec);
    return codec;
  }

  throw new Error("No codec found or no active connection for this chainId");
}
