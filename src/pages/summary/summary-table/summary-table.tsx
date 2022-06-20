import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import * as Tables from 'common/ui/tables';
import {ThemeContext, ThemeContextType} from 'common/context';
import {SummaryCountry} from 'services/summary/types';
import {Country} from 'services/countries/types';
import {bem} from 'common/bem';
import {IOrder} from 'common/types';
import {useSummaryService} from 'services/summary/use-summary-service';
import {useCountries} from 'services/countries/countries-context';

import {SummaryTableItem} from './summary-table-item';

import './summary-table.scss';

const b = bem('summary-table');

export function SummaryTable() {
  const {t} = useTranslation();
  const {summary, getSummary} = useSummaryService();
  const {countries} = useCountries();

  const {theme}: ThemeContextType = useContext(ThemeContext);
  const bt = bem('summary-table', theme);
  const [list, setList] = useState<SummaryCountry[]>([]);
  const [order, setOrder] = useState<IOrder>({type: 'asc', fieldName: 'Countries'});

  useEffect(() => {
    getSummary();
  }, []);

  useEffect(() => {
    setList(summary?.Countries || []);
  }, [summary]);

  useEffect(() => {
    const listCountriesSelected: Country[] = countries.filter((item) => item.selected);

    const listSelected = summary?.Countries.filter((item) =>
      listCountriesSelected.find((selectedCountry) => selectedCountry.Country === item.Country),
    );

    listSelected?.length === 0 ? setList(summary?.Countries || []) : setList(listSelected || []);
  }, [countries.filter((v) => v.selected).length]);

  const handleSort = (order: IOrder) => {
    const listSorted = [...list].sort((a, b) => {
      switch (order.fieldName) {
        case 'Countries':
          if (order.type === 'asc') return a.Country.localeCompare(b.Country);

          return b.Country.localeCompare(a.Country);
        case 'NewConfirmed':
          if (order.type === 'asc') return Number(b.NewConfirmed) - Number(a.NewConfirmed);

          return Number(a.NewConfirmed) - Number(b.NewConfirmed);
        case 'NewDeaths':
          if (order.type === 'asc') return b.NewDeaths - a.NewDeaths;

          return a.NewDeaths - b.NewDeaths;
        case 'TotalConfirmed':
          if (order.type === 'asc') return b.TotalConfirmed - a.TotalConfirmed;

          return a.TotalConfirmed - b.TotalConfirmed;
        case 'TotalDeaths':
          if (order.type === 'asc') return b.TotalDeaths - a.TotalDeaths;

          return a.TotalDeaths - b.TotalDeaths;
        default:
          return 0;
      }
    });

    setOrder({fieldName: order.fieldName, type: order.type});
    setList(listSorted);
  };

  return (
    <Tables.Table className={bt()}>
      <Tables.Caption className={bt('caption')}>{t('data_sheet.table.header')}</Tables.Caption>
      <Tables.Head className={bt('head')}>
        <Tables.Row>
          <>
            <Tables.HeadCell name="Countries" order={order} onOrder={handleSort}>
              {t('data_sheet.table.countries')}
            </Tables.HeadCell>
            <Tables.HeadCell name="NewConfirmed" order={order} onOrder={handleSort}>
              {t('data_sheet.table.new_confirmed')}
            </Tables.HeadCell>
            <Tables.HeadCell name="NewDeaths" order={order} onOrder={handleSort}>
              {t('data_sheet.table.new_deaths')}
            </Tables.HeadCell>
            <Tables.HeadCell name="TotalConfirmed" order={order} onOrder={handleSort}>
              {t('data_sheet.table.total_confirmed')}
            </Tables.HeadCell>
            <Tables.HeadCell name="TotalDeaths" order={order} onOrder={handleSort}>
              {t('data_sheet.table.total_deaths')}
            </Tables.HeadCell>
          </>
        </Tables.Row>
      </Tables.Head>
      <Tables.Body className={b('body')}>
        {list.map((item) => (
          <SummaryTableItem key={item.ID} model={item} />
        ))}
      </Tables.Body>
    </Tables.Table>
  );
}
