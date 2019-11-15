import { Algorithm, ChainId } from "@iov/bcp";
import { Slip10RawIndex } from "@iov/crypto";
import { UserProfile } from "@iov/keycontrol";

import { createTwoKeyringProfile } from "./userprofilehelpers";

describe("userprofilehelpers", () => {
  describe("createTwoKeyringProfile", () => {
    it("creates profile with Ed25519 and Secp256k1 keyrings", async () => {
      const mnemonic = "sight welcome change quality permit urban spend husband naive abuse slogan trumpet";
      const profile = createTwoKeyringProfile(mnemonic);

      // Test basic structure
      expect(profile).toBeInstanceOf(UserProfile);
      expect(profile.keyrings.value.length).toEqual(2);

      // Test for correct mnemonic
      const [keyring1, keyring2] = profile.keyrings.value.map(keyring => keyring.id);
      expect(profile.printableSecret(keyring1)).toEqual(mnemonic);
      expect(profile.printableSecret(keyring2)).toEqual(mnemonic);

      // Test that first keyring is Ed25519 and second one Secp256k1
      const chain = "local-foobar" as ChainId;
      const path = [Slip10RawIndex.hardened(1), Slip10RawIndex.hardened(2)];
      expect((await profile.createIdentity(keyring1, chain, path)).pubkey.algo).toEqual(Algorithm.Ed25519);
      expect((await profile.createIdentity(keyring2, chain, path)).pubkey.algo).toEqual(Algorithm.Secp256k1);
    });
  });
});
