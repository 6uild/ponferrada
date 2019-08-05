import { Address, ChainId } from "@iov/bcp";
import { linkTo } from "@storybook/addon-links";
import { storiesOf } from "@storybook/react";
import React from "react";

import DecoratedStorybook, { WALLET_ROOT } from "../../utils/storybook";
import { BALANCE_STORY_PATH, BALANCE_STORY_VIEW_PATH } from "../balance/index.stories";
import Layout, { ChainAddress } from "./components";

export const RECEIVE_PAYMENT_STORY_PATH = `Receive Payment`;

const CHAIN_ADDRESSES: ChainAddress[] = [
  {
    chainId: "ethereum-eip155-5777" as ChainId,
    chainName: "Ganache",
    address: "0xD383382350F9f190Bd2608D6381B15b4e1cec0f3" as Address,
  },
  {
    chainId: "local-iov-devnet" as ChainId,
    chainName: "IOV Devnet",
    address: "tiov1q5lyl7asgr2dcweqrhlfyexqpkgcuzrm4e0cku" as Address,
  },
  {
    chainId: "lisk-198f2b61a8" as ChainId,
    chainName: "Lisk Devnet",
    address: "1349293588603668134L" as Address,
  },
];

storiesOf(WALLET_ROOT, module)
  .addParameters({ viewport: { defaultViewport: "responsive" } })
  .add(
    RECEIVE_PAYMENT_STORY_PATH,
    (): JSX.Element => (
      <DecoratedStorybook>
        <Layout
          chainAddresses={CHAIN_ADDRESSES}
          onReturnToBalance={linkTo(BALANCE_STORY_PATH, BALANCE_STORY_VIEW_PATH)}
        />
      </DecoratedStorybook>
    ),
  );
