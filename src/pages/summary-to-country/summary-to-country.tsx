import React, {useContext} from 'react';

import {ThemeContext} from 'common/context';
import {bem} from 'common/bem';

import {SummaryToCountryChart} from './summary-to-country-chart';
import {StatisticsCountry} from './statistics-country';

import './summary-to-country.scss';

export function SummaryToCountry() {
  const {theme} = useContext(ThemeContext);
  const b = bem('summary-to-country', theme);

  return (
    <div className={b()}>
      <div className={b('container')}>
        <SummaryToCountryChart />
        <StatisticsCountry />
      </div>
    </div>
  );
}
