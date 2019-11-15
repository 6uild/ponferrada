import { Action, combineReducers, Reducer } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { artifactReducer, ArtifactState } from "./artifacts";
import { balancesReducer, BalanceState } from "./balances";
import { identitiesReducer, IdentitiesState } from "./identities";
import { notificationReducer, NotificationState } from "./notifications";
import { rpcEndpointReducer, RpcEndpointState } from "./rpcendpoint";
import { tokensReducer, TokenState } from "./tokens";

export interface ResetAppActionType extends Action {
  type: "@@app/RESET";
}

export interface RootState {
  rpcEndpoint: RpcEndpointState;
  identities: IdentitiesState;
  notifications: NotificationState;
  tokens: TokenState;
  balances: BalanceState;
  artifacts: ArtifactState;
}

const allReducers = combineReducers({
  rpcEndpoint: rpcEndpointReducer,
  identities: identitiesReducer,
  notifications: notificationReducer,
  tokens: tokensReducer,
  balances: balancesReducer,
  artifacts: artifactReducer,
});

const createRootReducer = (): Reducer<RootState> => (
  state: RootState | undefined,
  action: ActionType<typeof actions>,
) => {
  if (action.type === "@@app/RESET") {
    return allReducers(undefined, action);
  }

  return allReducers(state, action);
};

export default createRootReducer();
