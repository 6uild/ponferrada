import { Action, combineReducers, Reducer } from "redux";
import { StateType } from "typesafe-actions";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { balancesReducer, BalanceState } from "./balances";
import { extensionReducer, ExtensionState } from "./extension";
import { notificationReducer, NotificationState } from "./notifications";
import { tokensReducer, TokenState } from "./tokens";
import { usernamesReducer, UsernamesState } from "./usernames";

export interface ResetAppActionType extends Action {
  type: "@@app/RESET";
}

export interface RootReducer {
  extension: ExtensionState;
  notifications: NotificationState;
  tokens: TokenState;
  balances: BalanceState;
  usernames: UsernamesState;
}

const allReducers = combineReducers({
  extension: extensionReducer,
  notifications: notificationReducer,
  tokens: tokensReducer,
  balances: balancesReducer,
  usernames: usernamesReducer,
});

const createRootReducer = (): Reducer<RootReducer> => (
  state: RootReducer | undefined,
  action: ActionType<typeof actions>,
) => {
  if (action.type === "@@app/RESET") {
    //test
    return allReducers(undefined, action);
  }

  return allReducers(state, action);
};

export type RootState = StateType<ReturnType<typeof createRootReducer>>;

export default createRootReducer();
