import * as React from "react";
import { Route, Router, Switch } from "react-router";

import { history } from "../utils/history";
import CreateKeyring from "./create-keyring";
import DeleteKeyring from "./delete-keyring";
import KeyringStatus from "./keyring";
import {
  CREATE_KEYRING_ROUTE,
  DELETE_KEYRING_ROUTE,
  KEYRING_STATUS_ROUTE,
  RECOVERY_WORDS_ROUTE,
  REQUEST_ROUTE,
  RESTORE_KEYRING,
  SHARE_IDENTITY,
  TX_REQUEST,
  UNLOCK_ROUTE,
  WELCOME_ROUTE,
} from "./paths";
import RecoveryWords from "./recovery-words";
import Requests from "./requests";
import RestoreKeyring from "./restore-keyring";
import ShareIdentity from "./share-identity";
import TxRequest from "./tx-request";
import Unlock from "./unlock";
import Welcome from "./welcome";

export const MainRouter = (): JSX.Element => (
  <Router history={history}>
    <Switch>
      <Route exact path={WELCOME_ROUTE} component={Welcome} />
      <Route exact path={CREATE_KEYRING_ROUTE} component={CreateKeyring} />
      <Route exact path={UNLOCK_ROUTE} component={Unlock} />
      <Route exact path={RECOVERY_WORDS_ROUTE} component={RecoveryWords} />
      <Route exact path={RESTORE_KEYRING} component={RestoreKeyring} />
      <Route exact path={KEYRING_STATUS_ROUTE} component={KeyringStatus} />
      <Route exact path={SHARE_IDENTITY} component={ShareIdentity} />
      <Route exact path={TX_REQUEST} component={TxRequest} />
      <Route exact path={REQUEST_ROUTE} component={Requests} />
      <Route exact path={DELETE_KEYRING_ROUTE} component={DeleteKeyring} />
    </Switch>
  </Router>
);

export default MainRouter;
