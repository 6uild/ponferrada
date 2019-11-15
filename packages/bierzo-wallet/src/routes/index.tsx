import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router";

import RequireLogin from "../components/RequireLogin";
import Artifacts from "./artifacts";
import Login from "./login";
import {
  ARTIFACT_ROUTE,
  LOGIN_ROUTE,
  PAYMENT_ROUTE,
  POLICY_ROUTE,
  REGISTER_ARTIFACT_ROUTE,
  TERMS_ROUTE,
  TRANSACTIONS_ROUTE,
} from "./paths";
import Payment from "./payment";
import Policy from "./policy";
import RegisterArtifact from "./registerArtifact";
import Terms from "./terms";
import Transactions from "./transactions";

export const history = createBrowserHistory();

const Routes = (): JSX.Element => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path={LOGIN_ROUTE} component={Login} />
      <RequireLogin>
        <Route exact path={PAYMENT_ROUTE} component={Payment} />
        <Route exact path={ARTIFACT_ROUTE} component={Artifacts} />
        <Route exact path={TRANSACTIONS_ROUTE} component={Transactions} />
        <Route exact path={REGISTER_ARTIFACT_ROUTE} component={RegisterArtifact} />
        <Route exact path={TERMS_ROUTE} component={Terms} />
        <Route exact path={POLICY_ROUTE} component={Policy} />
      </RequireLogin>
    </Switch>
  </Router>
);

export default Routes;
