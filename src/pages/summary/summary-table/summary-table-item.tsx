import React, {useContext, memo} from 'react';

import {Row} from 'common/ui/tables';
import {SummaryCountry} from 'services/summary/types';
import {ThemeContext} from 'common/context';
import {history} from 'common/routing';
import {bem} from 'common/bem';

import {SummaryTableItemCell} from './summary-table-item-cell';

import './summary-table.scss';

type Props = {
  model: SummaryCountry;
};

export const SummaryTableItem = memo(({model}: Props) => {
  const {theme} = useContext(ThemeContext);
  const bt = bem('summary-table', theme);

  const redirectToSummaryToCountry = () => {
    history.push(`summary/${model.Slug}`);
  };

  return (
    <Row className={bt('row')} onClick={redirectToSummaryToCountry}>
      <SummaryTableItemCell>{model.Country}</SummaryTableItemCell>
      <SummaryTableItemCell>{model.NewConfirmed}</SummaryTableItemCell>
      <SummaryTableItemCell>{model.NewDeaths}</SummaryTableItemCell>
      <SummaryTableItemCell>{model.TotalConfirmed}</SummaryTableItemCell>
      <SummaryTableItemCell>{model.TotalDeaths}</SummaryTableItemCell>
    </Row>
  );
});

SummaryTableItem.displayName = 'SummaryTableItem';
