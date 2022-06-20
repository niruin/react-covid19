import React from 'react';

import {Cell} from 'common/ui/tables';

type Props = {
  children: React.ReactNode;
};

export function SummaryTableItemCell({children}: Props) {
  return <Cell>{children}</Cell>;
}
