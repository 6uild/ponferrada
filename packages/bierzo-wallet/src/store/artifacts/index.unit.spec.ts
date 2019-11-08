import { Algorithm, ChainId, Identity, PubkeyBytes } from "@iov/bcp";
import { Encoding } from "@iov/encoding";

import { disconnect } from "../../logic/connection";
import { aNewStore } from "../../store";
import { establishAllConnections } from "../../utils/test/connections";
import { withChainsDescribe } from "../../utils/test/testExecutor";
import { addArtifactAction, getArtifacts } from "./actions";
import { BwArtifact } from "./reducer";

withChainsDescribe("Artfifacts reducer", () => {
  beforeAll(async () => {
    await establishAllConnections();
  });
  afterAll(() => disconnect());

  it("has correct initial state", async () => {
    const store = aNewStore();
    const artfifacts = store.getState().artifacts;
    expect(artfifacts).toEqual([]);
  });

  it("returns empty when no identities passed to getArtifacts function", async () => {
    const artfifacts = await getArtifacts([]);
    expect(artfifacts).toEqual([]);
  });

  it("returns empty when no bns identity key is s passed to getArtifacts function", async () => {
    const identities: Identity[] = [
      {
        chainId: "ethereum-eip155-5777" as ChainId,
        pubkey: {
          algo: Algorithm.Secp256k1,
          data: Encoding.fromHex(
            "04965fb72aad79318cd8c8c975cf18fa8bcac0c091605d10e89cd5a9f7cff564b0cb0459a7c22903119f7a42947c32c1cc6a434a86f0e26aad00ca2b2aff6ba381",
          ) as PubkeyBytes,
        },
      },
    ];

    const artfifacts = await getArtifacts(identities);
    expect(artfifacts).toEqual([]);
  });

  describe("artfifactsReducer", () => {
    it("can add artifacts", () => {
      const artfifactsToAdd: BwArtifact[] = [
        {
          image: "foobar",
          checksum: "anyValidChecksum",
        },
      ];

      const store = aNewStore();
      expect(store.getState().artifacts).toEqual([]);
      store.dispatch(addArtifactAction(artfifactsToAdd));
      expect(store.getState().artifacts).toEqual(artfifactsToAdd);
    });

    it("overrides existing entries", () => {
      const artfifactsToAdd1: BwArtifact[] = [
        {
          image: "foobar",
          checksum: "anyValidChecksum",
        },
      ];
      const artfifactsToAdd2: BwArtifact[] = [
        {
          image: "foobar",
          checksum: "anyValidChecksum",
        },
      ];

      const store = aNewStore();
      store.dispatch(addArtifactAction(artfifactsToAdd1));
      store.dispatch(addArtifactAction(artfifactsToAdd2));
      expect(store.getState().artifacts).toEqual(artfifactsToAdd2);
    });

    it("overrides keeps existing entries alive", () => {
      const artfifactsToAdd1: BwArtifact[] = [
        {
          image: "foobar",
          checksum: "anyValidChecksum",
        },
      ];
      const artfifactsToAdd2: BwArtifact[] = [
        {
          image: "foobar",
          checksum: "anyValidChecksum",
        },
      ];

      const store = aNewStore();
      store.dispatch(addArtifactAction(artfifactsToAdd1));
      store.dispatch(addArtifactAction(artfifactsToAdd2));
      expect(store.getState().artifacts).toEqual([...artfifactsToAdd1, ...artfifactsToAdd2]);
    });
  });
});
