import {
  Address,
  Amount,
  ChainId,
  Identity,
  SendTransaction,
  UnsignedTransaction,
  WithCreator,
} from "@iov/bcp";
import { CreateArtifactTX } from "iov-bns";
import { TransactionEncoder } from "@iov/encoding";
import { JsonRpcRequest, makeJsonRpcId } from "@iov/jsonrpc";

import { getConfig } from "../config";
import { getCodecForChainId } from "../logic/codec";

export async function generateGetIdentitiesRequest(): Promise<JsonRpcRequest> {
  const chains = (await getConfig()).chains;
  const chainIdsToRequest = chains.map(chain => chain.chainSpec.chainId);

  return {
    jsonrpc: "2.0",
    id: makeJsonRpcId(),
    method: "getIdentities",
    params: {
      reason: TransactionEncoder.toJson("I would like to know who you are on Ethereum"),
      chainIds: TransactionEncoder.toJson(chainIdsToRequest),
    },
  };
}

async function withChainFee<T extends UnsignedTransaction>(chainId: ChainId, transaction: T): Promise<T> {
  // grafain-chilinet has no fees setup.
  return { ...transaction, fee: undefined };
}

export const generateSendTxRequest = async (
  creator: Identity,
  recipient: Address,
  amount: Amount,
  memo: string | undefined,
): Promise<JsonRpcRequest> => {
  const codec = await getCodecForChainId(creator.chainId);

  const transactionWithFee: SendTransaction & WithCreator = await withChainFee(creator.chainId, {
    kind: "bcp/send",
    recipient,
    creator,
    sender: codec.identityToAddress(creator),
    amount: amount,
    memo: memo,
  });

  return {
    jsonrpc: "2.0",
    id: makeJsonRpcId(),
    method: "signAndPost",
    params: {
      reason: TransactionEncoder.toJson("I would like you to sign this request"),
      transaction: TransactionEncoder.toJson(transactionWithFee),
    },
  };
};

export const generateCreateArtifactTxWithFee = async (
  creator: Identity,
  image: string,
  checksum: string,
): Promise<CreateArtifactTX & WithCreator> => {
  const createArtifactTx: CreateArtifactTX & WithCreator = {
    kind: "bns/create_artifact",
    creator,
    image,
    checksum,
  };

  return await withChainFee(creator.chainId, createArtifactTx);
};

export const generateCreateArtifactTxRequest = async (
  creator: Identity,
  image: string,
  checksum: string,
): Promise<JsonRpcRequest> => {
  const transactionWithFee = await generateCreateArtifactTxWithFee(creator, image, checksum);

  return {
    jsonrpc: "2.0",
    id: makeJsonRpcId(),
    method: "signAndPost",
    params: {
      reason: TransactionEncoder.toJson("I would like you to sign this request"),
      transaction: TransactionEncoder.toJson(transactionWithFee),
    },
  };
};
