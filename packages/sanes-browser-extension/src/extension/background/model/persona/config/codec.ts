import { createGrafainConnector } from "@6uild/grafain";
import { Algorithm, ChainConnector, ChainId } from "@iov/bcp";
import { Slip10RawIndex } from "@iov/crypto";
import { HdPaths } from "@iov/keycontrol";

import { CodecString } from "./configurationfile";

export enum CodecType {
  Grafain,
  Lisk,
  Ethereum,
}

export function codecTypeFromString(input: CodecString): CodecType {
  switch (input) {
    case "grafain":
      return CodecType.Grafain;
    case "lsk":
      return CodecType.Lisk;
    case "eth":
      return CodecType.Ethereum;
    default:
      throw new Error(`Codec '${input}' not supported`);
  }
}

export function algorithmForCodec(codec: CodecType): Algorithm {
  switch (codec) {
    case CodecType.Grafain:
    case CodecType.Lisk:
      return Algorithm.Ed25519;
    case CodecType.Ethereum:
      return Algorithm.Secp256k1;
    default:
      throw new Error(`unsupported codec: ${codec}`);
  }
}

export function pathBuilderForCodec(codecType: CodecType): (derivation: number) => readonly Slip10RawIndex[] {
  const pathBuilder = (derivation: number): readonly Slip10RawIndex[] => {
    switch (codecType) {
      case CodecType.Grafain:
        return HdPaths.iov(derivation);
      case CodecType.Lisk:
        return HdPaths.bip44Like(134, derivation);
      case CodecType.Ethereum:
        return HdPaths.ethereum(derivation);
      default:
        throw new Error(`unsupported codec: ${codecType}`);
    }
  };
  return pathBuilder;
}

export function chainConnector(
  codec: CodecType,
  expectedChainId: ChainId,
  nodeUrl: string,
  scraper: string | undefined,
): ChainConnector {
  switch (codec) {
    case CodecType.Grafain:
      return createGrafainConnector(nodeUrl, expectedChainId);
    default:
      throw new Error("No connector for this codec found");
  }
}
