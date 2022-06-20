import React from 'react';
import {useTranslation} from 'react-i18next';

import {Country, ListCountriesState} from 'services/countries/types';
import {ButtonsGroup} from 'common/ui/button';
import {Wrapper} from 'common/ui/wrapper';
import {bem} from 'common/bem';

import {OverBoxItem} from './over-box-item';
import {BtnLink} from '../btn-link';

import './over-box.scss';

const b = bem('over-box');

type Props = ListCountriesState & {
  countries: Country[];
  filter: string;
  showOnlySelected: boolean;
  closeOverBox: () => void;
  resetOverBox: () => void;
  isShowResetBtn: boolean;
  isShowOverBoxCountriesSelected: boolean;
  onToggleCountry: (slug: string) => void;
};

export function OverBox({
  countries,
  loading,
  error,
  showOnlySelected,
  filter,
  closeOverBox,
  isShowResetBtn,
  resetOverBox,
  isShowOverBoxCountriesSelected,
  onToggleCountry,
}: Props) {
  const {t} = useTranslation();

  const allOrSelectedCountriesList = showOnlySelected ? countries.filter((item) => item.selected) : countries;
  const regex = new RegExp(`^${filter.toLowerCase()}`);
  const actualListFiltered = filter
    ? allOrSelectedCountriesList.filter((item) => item.Country.toLowerCase().match(regex))
    : allOrSelectedCountriesList;

  return (
    <>
      <div className={b()}>
        {loading && <div>Loading...</div>}
        {error && <div>Не удалось загрузить данные</div>}
        <Wrapper>
          {isShowOverBoxCountriesSelected && !countries.some((item) => item.selected) && (
            <div>{t('menu.non_selected_countries')}</div>
          )}
        </Wrapper>
        <ButtonsGroup className={b('btn-group')}>
          <BtnLink
            onClick={closeOverBox}
            isShowOverBoxCountriesSelected={isShowOverBoxCountriesSelected}
            countries={countries}
          />
          {isShowResetBtn && (
            <div className={b('btn-control')} onClick={resetOverBox}>
              {t('menu.reset')}
            </div>
          )}
        </ButtonsGroup>
        <div className={b('list')}>
          {actualListFiltered.map((item, index) => (
            <OverBoxItem country={item} key={index} onToggleCountry={onToggleCountry} />
          ))}
        </div>
      </div>
    </>
  );
}
