import { Page } from 'puppeteer';
import TestUtils from 'react-dom/test-utils';
import { Store } from 'redux';
import { history } from '../../../routes';
import { createDom } from '../../../utils/test/dom';
import { whenOnNavigatedToE2eRoute, whenOnNavigatedToRoute } from '../../../utils/test/navigation';
import { WELCOME_ROUTE } from '../../paths';

export const travelToWelcome = async (store: Store): Promise<React.Component> => {
  const dom = createDom(store);
  TestUtils.act(
    (): void => {
      history.push(WELCOME_ROUTE);
    },
  );
  await whenOnNavigatedToRoute(WELCOME_ROUTE);

  return dom;
};

export const travelToWelcomeE2e = async (page: Page): Promise<void> => {
  await page.click('button');
  console.log('Starting navigation to welcome');
  await whenOnNavigatedToE2eRoute(page, WELCOME_ROUTE);
  console.log('Ended navigation to welcome');
};
