import { createGrafainConnector, GrafainConnection } from "@6uild/grafain";
import { BlockchainConnection, ChainId } from "@iov/bcp";

import { ChainSpec, getConfig } from "../config";

const connections = new Map<ChainId, BlockchainConnection>();

async function establishGrafainConnection(url: string, chainId: ChainId): Promise<void> {
  if (!connections.has(chainId)) {
    const connector = createGrafainConnector(url, chainId);
    connections.set(chainId, await connector.establishConnection());
  }
}

export function isGrafainSpec(spec: ChainSpec): boolean {
  return spec.codecType === "grafain";
}

export async function establishConnection(spec: ChainSpec): Promise<void> {
  if (isGrafainSpec(spec)) {
    return await establishGrafainConnection(spec.node, spec.chainId as ChainId);
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
