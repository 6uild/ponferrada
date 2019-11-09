import { ChainId } from "@iov/bcp";
import { randomString } from "ui-logic";

import { establishAllConnections } from "../utils/test/connections";
import { withChainsDescribe } from "../utils/test/testExecutor";
import { isValidImageName, lookupRecipientAddressByName } from "./account";
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

  describe("without blockchain", () => {
    it("should return 'not_iov' error", () => {
      const result = isValidImageName(randomString(10));
      expect(result).toBe("not_iov");
    });

    it("should return 'wrong_number_of_asterisks' error", () => {
      const result = isValidImageName(`${randomString(10)}*some*iov`);
      expect(result).toBe("wrong_number_of_asterisks");
    });

    it("should return 'too_short' error", () => {
      const result = isValidImageName(`${randomString(2)}*iov`);
      expect(result).toBe("too_short");
    });

    it("should return 'too_long' error", () => {
      const result = isValidImageName(`${randomString(65)}*iov`);
      expect(result).toBe("too_long");
    });

    it("should return 'wrong_chars' error", () => {
      const result = isValidImageName("string+with|wrong!characters*iov");
      expect(result).toBe("wrong_chars");
    });

    it("should return 'valid' result", () => {
      const result = isValidImageName("some_correct-user.name*iov");
      expect(result).toBe("valid");
    });
  });
});
