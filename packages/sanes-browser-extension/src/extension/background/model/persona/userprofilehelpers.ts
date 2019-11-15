import { Ed25519HdWallet, Secp256k1HdWallet, UserProfile } from "@iov/keycontrol";

export function createTwoKeyringProfile(mnemonic: string): UserProfile {
  const edKeyring = Ed25519HdWallet.fromMnemonic(mnemonic);
  const secpKeyring = Secp256k1HdWallet.fromMnemonic(mnemonic);

  const profile = new UserProfile();
  profile.addWallet(edKeyring);
  profile.addWallet(secpKeyring);
  return profile;
}
