import { BlockchainConnection, ChainId } from "@iov/bcp";
import { GrafainConnection, createGrafainConnector } from "@6uild/grafain";
import { createEthereumConnector, EthereumConnectionOptions } from "@iov/ethereum";
import { createLiskConnector } from "@iov/lisk";

import { ChainSpec, getConfig } from "../config";

const connections = new Map<ChainId, BlockchainConnection>();

async function establishEthereumConnection(
  url: string,
  chainId: ChainId,
  options: EthereumConnectionOptions,
): Promise<void> {
  if (!connections.has(chainId)) {
    const connector = createEthereumConnector(url, options, chainId);
    connections.set(chainId, await connector.establishConnection());
  }
}

async function establishGrafainConnection(url: string, chainId: ChainId): Promise<void> {
  if (!connections.has(chainId)) {
    const connector = createGrafainConnector(url, chainId);
    connections.set(chainId, await connector.establishConnection());
  }
}

async function establishLiskConnection(url: string, chainId: ChainId): Promise<void> {
  if (!connections.has(chainId)) {
    const connector = createLiskConnector(url, chainId);
    connections.set(chainId, await connector.establishConnection());
  }
}

export function isGrafainSpec(spec: ChainSpec): boolean {
  return spec.codecType === "grafain";
}

export function isLskSpec(spec: ChainSpec): boolean {
  return spec.codecType === "lsk";
}

export function isEthSpec(spec: ChainSpec): boolean {
  return spec.codecType === "eth";
}

export async function establishConnection(spec: ChainSpec): Promise<void> {
  if (isEthSpec(spec)) {
    return await establishEthereumConnection(spec.node, spec.chainId as ChainId, {
      scraperApiUrl: spec.scraper,
    });
  }
  if (isGrafainSpec(spec)) {
    return await establishGrafainConnection(spec.node, spec.chainId as ChainId);
  }
  if (isLskSpec(spec)) {
    return await establishLiskConnection(spec.node, spec.chainId as ChainId);
  }

  throw new Error("Chain spec not supported");
}

export function getActiveConnections(): readonly BlockchainConnection[] {
  return [...connections.values()];
}

export function getConnectionForChainId(chainId: ChainId): BlockchainConnection | undefined {
  return connections.get(chainId);
}

export async function getConnectionForGrafain(): Promise<GrafainConnection> {
  const chains = (await getConfig()).chains;
  const grafainChain = chains.find(chain => isGrafainSpec(chain.chainSpec));
  if (grafainChain) {
    return getConnectionForChainId(grafainChain.chainSpec.chainId as ChainId) as GrafainConnection;
  }

  throw new Error("No connection found for GRAFAIN chain");
}

/**
 * Disconnects all blockchain connections. Calling establishConnection after
 * this will establich a new connection.
 */
export function disconnect(): void {
  connections.forEach(connection => {
    connection.disconnect();
  });

  connections.clear();
}
