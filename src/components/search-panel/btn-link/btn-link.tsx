import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';

import {ThemeContext, ThemeContextType} from 'common/context';
import {Country} from 'services/countries/types';
import {Underlink} from 'common/ui/underlink';
import {bem} from 'common/bem';

import './btn-link.scss';

type Props = {
  onClick: () => void;
  countries: Country[];
  isShowOverBoxCountriesSelected?: boolean;
};

export function BtnLink({onClick, isShowOverBoxCountriesSelected, countries}: Props) {
  const {t} = useTranslation();
  const b = bem('btn-link');
  const {theme}: ThemeContextType = useContext(ThemeContext);
  const countSelected = countries.filter((item) => item.selected).length || 0;
  const countCountriesSelectedStr = isShowOverBoxCountriesSelected
    ? t('menu.show_all')
    : `${t('menu.selected')} ${countSelected}`;

  return <Underlink className={b()} onClick={onClick} text={countCountriesSelectedStr} theme={theme} />;
}
