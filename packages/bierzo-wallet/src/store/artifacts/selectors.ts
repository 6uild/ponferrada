import { RootState } from "../reducers";
import { BwArtifact } from ".";

// deprecated unused
export const getFirstArtifact = (state: RootState): BwArtifact | undefined => {
  const artf = state.artifacts.find(() => true);
  return artf;
};
