import React, {useEffect, useState, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import {Dropdown} from 'common/ui/dropdown';
import {Wrapper} from 'common/ui/wrapper';
import {GetCountriesResponse} from 'services/countries/types';
import {ThemeContext} from 'common/context';
import {useParams} from 'common/hooks/use-router';
import {bem} from 'common/bem';
import {history} from 'common/routing';
import {Options} from 'common/types';
import colors from 'common/styles/_export.module.scss';
import {useChartDataService} from 'services/chart-data/use-chart-data-service';
import {useCountriesService} from 'services/countries/use-countries-service';

import {TWO_WEEK, MONTH, TREE_MONTH, HALF_YEAR, ALL_TIME} from './consts';
import './summary-to-country-chart.scss';
import {useStaticsCountry} from '../../../services/statistics-country';

function collectionOptions(list: GetCountriesResponse, filter: string): Options {
  const regex = new RegExp(`^${filter.toLowerCase()}`);
  return list
    .filter((item) => item.Country.toLowerCase().match(regex))
    .map((item) => ({
      label: item.Country,
      value: item.Slug,
    }));
}

type TypeData = 'ConfirmedPerDay' | 'DeathsPerDay';

function getDataKeyLine(type: TypeData) {
  if (type === 'ConfirmedPerDay') {
    return 'ConfirmedAvgOverWeek';
  }
  if (type === 'DeathsPerDay') {
    return 'DeathsAvgOverWeek';
  }
}

export function SummaryToCountryChart() {
  const {theme} = useContext(ThemeContext);
  const bt = bem('summary-to-country-chart', theme);

  const {t} = useTranslation();
  const {slug} = useParams<{slug: string}>();

  const [inputValueDropdown, setInputValueDropdown] = useState<string>('');
  const [periodValueDropdown, setPeriodValueDropdown] = useState<number>(HALF_YEAR);
  const [typeDataValueDropdown, setTypeDataValueDropdown] = useState<TypeData>('ConfirmedPerDay');
  const {getCountries, countries} = useCountriesService();

  const {chartData: data, getDayOneStat, loading} = useChartDataService();
  const {getStat} = useStaticsCountry();

  const formattedData = data?.data.slice(-periodValueDropdown) || [];

  const typeDataOptions: Options = [
    {label: t('chart.options.confirmed'), value: 'ConfirmedPerDay'},
    {label: t('chart.options.deaths'), value: 'DeathsPerDay'},
  ];
  const timePeriodOptions: Options = [
    {label: t('chart.options.all_time'), value: ALL_TIME, labelShort: 'all'},
    {label: t('chart.options.2week'), value: TWO_WEEK, labelShort: '2W'},
    {label: t('chart.options.30days'), value: MONTH, labelShort: 'M'},
    {label: t('chart.options.3months'), value: TREE_MONTH, labelShort: '3M'},
    {label: t('chart.options.6months'), value: HALF_YEAR, labelShort: '6M'},
  ];

  function getDataLabelDropdown() {
    const option = timePeriodOptions.find((item) => item.value === periodValueDropdown);

    return option?.label;
  }

  useEffect(() => {
    getDayOneStat(slug);
    getCountries();
  }, []);

  const handleChangeCountry = (value?: string) => {
    if (value) {
      history.push(`/summary/${value}`);
      getDayOneStat(value);
      getStat(value);
    } else {
      getDayOneStat(slug);
    }
  };

  const handleInputChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueDropdown(value);
  };

  const handleTogglePeriod = (value?: number) => {
    setPeriodValueDropdown(value || 0);
  };

  const handleToggleTypeData = (value?: TypeData) => {
    setTypeDataValueDropdown(value || 'ConfirmedPerDay');
  };

  return (
    <div className={bt('container')}>
      <Wrapper className={bt('dropdown-group')}>
        <Dropdown
          label={data?.Country || 'not selected'}
          options={collectionOptions(countries, inputValueDropdown)}
          onOptionClick={handleChangeCountry}
          value={inputValueDropdown}
          onChange={handleInputChange}
          theme={theme}
          onClick={countries.length === 0 ? getCountries : undefined}
          loadingOptions={loading}
        />
        <Dropdown
          label={getDataLabelDropdown()}
          options={timePeriodOptions}
          onOptionClick={handleTogglePeriod}
          theme={theme}
          disabled={!Boolean(data?.Country)}
        />
        <Dropdown
          label={typeDataOptions.find((item) => item.value === typeDataValueDropdown)?.label || typeDataValueDropdown}
          options={typeDataOptions}
          onOptionClick={handleToggleTypeData}
          theme={theme}
          disabled={!Boolean(data?.Country)}
        />
      </Wrapper>
      {formattedData.length > 0 && (
        <ResponsiveContainer className={bt('chart')} height={400}>
          <ComposedChart
            data={formattedData}
            margin={{
              top: 0,
              right: 50,
              bottom: 0,
              left: 0,
            }}
          >
            <CartesianGrid
              fill={'var(--background-secondary)'}
              stroke={theme === 'dark' ? colors.black60 : colors.blue}
            />
            <XAxis
              stroke={theme === 'dark' ? colors.gray80 : colors.black40}
              dataKey="Date"
              scale="band"
              fontSize={13}
              tickMargin={5}
              interval={'preserveStart'}
            />
            <YAxis stroke={theme === 'dark' ? colors.gray80 : colors.black40} fontSize={14} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--main-background-color)',
                borderColor: 'var(--main-border-color)',
              }}
            />
            <Bar name={t('chart.options.confirmed')} dataKey={typeDataValueDropdown} fill={colors.aqua} />
            <Line
              dataKey={getDataKeyLine(typeDataValueDropdown)}
              stroke={colors.orange}
              name={t('chart.avg7')}
              type="monotone"
              dot={periodValueDropdown === TWO_WEEK || periodValueDropdown === MONTH}
            />
            <Legend wrapperStyle={{position: 'static', fontSize: 15, marginLeft: 15}} fontFamily="apercu" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
