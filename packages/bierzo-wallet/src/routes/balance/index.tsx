import React from "react";
import * as ReactRedux from "react-redux";

import { history } from "..";
import PageMenu from "../../components/PageMenu";
import { RootState } from "../../store/reducers";
import { getRpcEndpointType } from "../../store/rpcendpoint/selectors";
import { REGISTER_ARTIFACT_ROUTE } from "../paths";
import Layout from "./components";

function onRegisterUsername(): void {
  history.push(REGISTER_ARTIFACT_ROUTE);
}

const Balance = (): JSX.Element => {
  const tokens = ReactRedux.useSelector((state: RootState) => state.balances);
  // const grafainUsername = ReactRedux.useSelector(getFirstArtifact);
  const rpcEndpointType = ReactRedux.useSelector(getRpcEndpointType);
  const iovAddress = undefined;

  return (
    <PageMenu>
      <Layout
        onRegisterUsername={onRegisterUsername}
        iovAddress={iovAddress}
        balances={tokens}
        rpcEndpointType={rpcEndpointType}
      />
    </PageMenu>
  );
};

export default Balance;
