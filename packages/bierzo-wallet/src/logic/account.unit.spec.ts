import { ChainId } from "@iov/bcp";
import { randomString } from "ui-logic";

import { establishAllConnections } from "../utils/test/connections";
import { withChainsDescribe } from "../utils/test/testExecutor";
import { lookupRecipientAddressByName } from "./account";
import { disconnect } from "./connection";

describe("Logic :: account", () => {
  withChainsDescribe("with blockchain", () => {
    beforeAll(async () => {
      await establishAllConnections();
    });
    afterAll(() => {
      disconnect();
    });

    it("should throw exception if namespace is missing", async () => {
      await expect(lookupRecipientAddressByName("test1", "ethereum-eip155-5777" as ChainId)).rejects.toThrow(
        /Username must include namespace suffix/i,
      );
    });

    it("should return personalized address not found ", async () => {
      const lookupResult = await lookupRecipientAddressByName("test1*iov", "ethereum-eip155-5777" as ChainId);

      expect(lookupResult).toBe("name_not_found");
    });
  });
});
