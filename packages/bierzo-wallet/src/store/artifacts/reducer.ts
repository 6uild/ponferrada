import { Action } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export interface BwArtifact {
  readonly image: string;
  readonly checksum: string;
}

export interface AddArtifactActionType extends Action {
  readonly type: "@@artifact/ADD";
  readonly payload: readonly BwArtifact[];
}

export type ArtifactActions = ActionType<typeof actions>;

export type ArtifactState = readonly BwArtifact[];
const initState: ArtifactState = [];

export function artifactReducer(state: ArtifactState = initState, action: ArtifactActions): ArtifactState {
  switch (action.type) {
    case "@@artifact/ADD": {
      const image = action.payload.map(name => name.image);
      const oldNamesToCopy = state.filter(name => !image.includes(name.image));
      return [...oldNamesToCopy, ...action.payload];
    }
    default:
      return state;
  }
}
