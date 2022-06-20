import React, {useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import {bem} from 'common/bem';
import {ThemeContext} from 'common/context';
import {useParams} from 'common/hooks/use-router';
import {useStaticsCountry} from 'services/statistics-country';

import {formatNumber} from './utils';
import './statistics-country.scss';

export const StatisticsCountry = () => {
  const {t} = useTranslation();
  const {slug} = useParams<{slug: string}>();
  const {theme} = useContext(ThemeContext);
  const bt = bem('statistics-country', theme);

  const {stat, getStat, loading} = useStaticsCountry();

  useEffect(() => {
    if (slug) getStat(slug);
  }, []);

  if (!stat) {
    return <div className={bt('container')}>No data</div>;
  }

  return (
    <div className={bt('container')}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={bt('summary')}>
          <div className={bt('summary-inner')}>
            <div>{stat?.continent}</div>
            <div>{stat?.country}</div>
            <div>
              {t('chart.population')}: {formatNumber(stat?.population)}
            </div>
            <div className={bt('label-mini')}>
              {t('chart.updated')} {stat?.day}
            </div>
          </div>
          <div className={bt('summary-inner')}>
            <div className={bt('summary-inner-row')}>
              <div className={bt('summary-inner-cell')}>
                <div className={bt('label')}>{t('chart.new_cases')}</div>
                <div className={bt('mark')}>{formatNumber(stat?.cases.total)}</div>
                <div className={bt('mark-light')}>{formatNumber(stat?.cases.new, '+')}</div>
              </div>
              <div className={bt('summary-inner-cell')}>
                <div className={bt('label')}>
                  {t('chart.cases')} ({t('chart.1_month')})
                </div>
                <div className={bt('mark')}>{formatNumber(stat?.cases['1M_pop'])}</div>
              </div>
            </div>
            <div className={bt('summary-inner-row')}>
              <div className={bt('summary-inner-cell')}>
                <div className={bt('label')}>{t('chart.deaths')}</div>
                <div className={bt('mark')}>{formatNumber(stat?.deaths.total)}</div>
                <div className={bt('mark-light')}>{formatNumber(stat?.deaths.new, '+')}</div>
              </div>
              <div className={bt('summary-inner-cell')}>
                <div className={bt('label')}>
                  {t('chart.cases')} ({t('chart.1_month')})
                </div>
                <div className={bt('mark')}>{formatNumber(stat?.deaths['1M_pop'])}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
