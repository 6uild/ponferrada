import { ChainId } from "@iov/bcp";
import { singleton } from "ui-logic";

export type CodecString = "grafain" | "lsk" | "eth";

export interface ChainSpec {
  readonly codecType: CodecString;
  readonly node: string;
  readonly name: string;
  readonly chainId: ChainId;
  readonly scraper?: string;
}

export interface ChainConfig {
  readonly chainSpec: ChainSpec;
}

export interface BlockExplorers {
  readonly [key: string]: string | undefined;
}

export interface ConfigurationFile {
  readonly chains: ChainConfig[];
  readonly blockExplorers: BlockExplorers;
  /** If set to true, keyring creation is disabled. Unsets is interpreted as false. */
  readonly keyringCreationDisabled?: boolean;
  /** If set to true, account creation is disabled. Unsets is interpreted as false. */
  readonly accountCreationDisabled?: boolean;
}

const loadConfigurationFile = async (): Promise<ConfigurationFile> => {
  if (process.env.NODE_ENV === "test") {
    const config = (window as any).config;
    return config;
  }

  const url = chrome.extension.getURL("assets/config/conf.json");
  const data = await fetch(url);
  const json = await data.json();

  return json;
};

export const getConfigurationFile = singleton<typeof loadConfigurationFile>(loadConfigurationFile);

/**
 * Gets a chain name from the configuration file. Falls back to the chain ID
 * if no name is found.
 */
export async function getChainName(chainId: ChainId): Promise<string> {
  const chains = (await getConfigurationFile()).chains;
  const selectedChain = chains.find(chain => chain.chainSpec.chainId === chainId);

  if (selectedChain) {
    return selectedChain.chainSpec.name;
  } else {
    return chainId;
  }
}
