import { Address, Algorithm, ChainId, PubkeyBytes, TokenTicker } from "@iov/bcp";
import { Encoding } from "@iov/encoding";
import { DeepPartial, Store } from "redux";

import { extensionRpcEndpoint } from "../../communication/extensionRpcEndpoint";
import { TRANSACTIONS_TEXT } from "../../components/Header/components/LinksMenu";
import { aNewStore } from "../../store";
import { BalanceState } from "../../store/balances";
import { ExtendedIdentity, IdentitiesState } from "../../store/identities";
import { RootState } from "../../store/reducers";
import { click, expectRoute } from "../../utils/test/dom";
import { findRenderedDOMComponentWithId } from "../../utils/test/reactElemFinder";
import { TRANSACTIONS_ROUTE } from "../paths";
import { travelToArtifacts } from "./test/travelToArtifacts";

const balancesAmount: DeepPartial<BalanceState> = {
  BASH: {
    quantity: "82500",
    fractionalDigits: 4,
    tokenTicker: "BASH" as TokenTicker,
  },
  CASH: {
    quantity: "1226775",
    fractionalDigits: 5,
    tokenTicker: "CASH" as TokenTicker,
  },
};

const grafainChainId = "local-grafain-devnet" as ChainId;

const identities: IdentitiesState = new Map<ChainId, ExtendedIdentity>([
  [
    grafainChainId,
    {
      identity: {
        chainId: grafainChainId,
        pubkey: {
          algo: Algorithm.Ed25519,
          data: Encoding.fromHex("aabbccdd") as PubkeyBytes,
        },
      },
      address: "tiov97g97g9" as Address,
      chainName: "IOV Local Devnet",
    },
  ],
]);

describe("The /artifacts route", () => {
  let store: Store<RootState>;
  let balanceDom: React.Component;
  describe("with balance and username", () => {
    beforeEach(async () => {
      store = aNewStore({
        identities: identities,
        balances: balancesAmount,
        rpcEndpoint: extensionRpcEndpoint,
      });
      balanceDom = await travelToArtifacts(store);
    });

    it("redirects to the /transactions route when clicked", async () => {
      const transactionsCard = (await findRenderedDOMComponentWithId(
        balanceDom,
        TRANSACTIONS_TEXT,
      )) as Element;

      expect(transactionsCard.textContent).toBe(TRANSACTIONS_TEXT);

      await click(transactionsCard);
      expectRoute(TRANSACTIONS_ROUTE);
    }, 15000);
  });
});
