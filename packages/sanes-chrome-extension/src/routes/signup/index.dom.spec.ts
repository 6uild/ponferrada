import { Store } from 'redux';
import { RootState } from '../../store/reducers';
import { aNewStore } from '../../store';
import { mayTestChains } from '../../utils/test/testExecutor';
import {
  submitAccountForm,
  handlePassPhrase,
  handleSecurityHint,
} from './test/fillSignupForm';
import { travelToSignup } from './test/travelToSignup';
import { randomString } from '../../utils/test/random';
import { PersonaManager } from '../../logic/persona';

describe('DOM > Feature > Signup', (): void => {
  let store: Store<RootState>;

  beforeEach(
    (): void => {
      store = aNewStore();
    }
  );

  afterEach(async () => {
    // Every signup test will create a Persona on its own. Here we make
    // sure that the persona instance is destroyed after each test.
    await PersonaManager.destroy();
  });

  mayTestChains(
    `should finish the signup three steps process`,
    async (): Promise<void> => {
      const signupDOM = await travelToSignup(store);
      const accountName = randomString(10);

      await submitAccountForm(signupDOM, accountName);
      await handlePassPhrase(signupDOM);
      await handleSecurityHint(signupDOM, accountName);

      // TODO travel to correct view after signing up
    },
    55000
  );
});
