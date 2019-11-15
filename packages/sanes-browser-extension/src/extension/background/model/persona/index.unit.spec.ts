import { EnglishMnemonic } from "@iov/crypto";

import { withChainsDescribe } from "../../../../utils/test/testExecutor";
import * as txsUpdater from "../../updaters/appUpdater";
import { Db } from "../backgroundscript/db";
import { Persona, PersonaAcccount } from "./index";

withChainsDescribe("Persona", () => {
  beforeAll(() => {
    jest.spyOn(txsUpdater, "transactionsUpdater").mockImplementation(() => {});
    jest.spyOn(txsUpdater, "updateRequestProvider").mockImplementation(() => {});
  });
  afterAll(() => {
    jest.spyOn(txsUpdater, "transactionsUpdater").mockReset();
    jest.spyOn(txsUpdater, "updateRequestProvider").mockReset();
  });

  describe("create", () => {
    it("can be created", async () => {
      const db = new Db();
      const persona = await Persona.create(db.getDb(), "passwd", undefined);
      expect(persona).toBeTruthy();
      persona.destroy();
    }, 10000);
  });

  describe("load", () => {
    it("can be loaded from database", async () => {
      const db = new Db().getDb();

      let originalMnemonic: string;
      let originalAccounts: readonly PersonaAcccount[];

      {
        const originalPersona = await Persona.create(db, "passwd", undefined);
        originalMnemonic = originalPersona.mnemonic;
        originalAccounts = await originalPersona.getAccounts();
        originalPersona.destroy();
      }

      {
        const loadedPersona = await Persona.load(db, "passwd", undefined);
        expect(loadedPersona.mnemonic).toEqual(originalMnemonic);
        expect(await loadedPersona.getAccounts()).toEqual(originalAccounts);
        loadedPersona.destroy();
      }
    }, 10000);

    it("saves additional accounts to the database automatically", async () => {
      const db = new Db().getDb();

      let originalAccounts: readonly PersonaAcccount[];

      {
        const originalPersona = await Persona.create(db, "passwd", undefined);
        await originalPersona.createAccount(db);
        originalAccounts = await originalPersona.getAccounts();
        originalPersona.destroy();
      }

      {
        const loadedPersona = await Persona.load(db, "passwd", undefined);
        expect(await loadedPersona.getAccounts()).toEqual(originalAccounts);
        loadedPersona.destroy();
      }
    }, 10000);
  });

  describe("mnemonic", () => {
    it("returns a mnemonic", async () => {
      const db = new Db().getDb();
      const persona = await Persona.create(db, "passwd", undefined);

      expect(() => {
        // this constructor throws when the mnemonic string is not valid
        new EnglishMnemonic(persona.mnemonic);
      }).not.toThrow();

      persona.destroy();
    }, 10000);

    it("returns the right mnemonic", async () => {
      const db = new Db().getDb();
      const presetMnemonic = "until apple post diamond casual bridge bird solid inform size prize debris";
      const persona = await Persona.create(db, "passwd", undefined, presetMnemonic);

      expect(persona.mnemonic).toEqual(presetMnemonic);

      persona.destroy();
    }, 10000);
  });

  describe("getAccounts", () => {
    it("can get accounts", async () => {
      const db = new Db().getDb();
      const persona = await Persona.create(db, "passwd", undefined);

      const accounts = await persona.getAccounts();
      expect(accounts.length).toEqual(1);
      expect(accounts[0].label).toEqual("Account 0");

      persona.destroy();
    }, 10000);
  });

  describe("createAccount", () => {
    it("can create an account", async () => {
      const db = new Db().getDb();
      const persona = await Persona.create(db, "passwd", undefined);

      {
        const accounts = await persona.getAccounts();
        expect(accounts.length).toEqual(1); // first account created by default
      }

      await persona.createAccount(db);

      {
        const accounts = await persona.getAccounts();
        expect(accounts.length).toEqual(2);
        expect(accounts[0].label).toEqual("Account 0");
        expect(accounts[1].label).toEqual("Account 1");
      }

      persona.destroy();
    }, 10000);
  });
});
