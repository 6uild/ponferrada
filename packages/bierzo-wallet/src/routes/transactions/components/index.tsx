import { Hairline } from "medulas-react-components";
import * as React from "react";

import AddArtifact from "./AddArtifact";
import NoTransactions from "./NoTransactions";
import TxTable from "./TxTable";
import { TxTableProps } from "./TxTable/rowTxBuilder";

const Layout = ({
  rows,
  onChangeRows,
  onPrevPage,
  onNextPage,
  onSort,
  orderBy,
  order,
}: TxTableProps): JSX.Element => {
  const hasRows = rows && rows.length > 0;

  return (
    <React.Fragment>
      <Hairline />
      <AddArtifact />
      <Hairline />
      {hasRows ? (
        <TxTable
          rows={rows}
          onChangeRows={onChangeRows}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onSort={onSort}
          orderBy={orderBy}
          order={order}
        />
      ) : (
        <NoTransactions />
      )}
    </React.Fragment>
  );
};

export default Layout;
