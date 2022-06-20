import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Input} from 'common/ui/input';
import {Backdrop} from 'common/ui/backdrop';
import {bem} from 'common/bem';
import {useCountries} from 'services/countries';
import {ReactComponent as CloseIcon} from 'assets/svg/ic_close.svg';

import {BtnLink} from './btn-link';
import {OverBox} from './over-box';

import './search-panel.scss';

const b = bem('search-panel');

export function SearchPanel() {
  const {t} = useTranslation();

  const [inputValue, setInputValue] = useState<string>('');
  const [isShowOverBox, setShowOverBox] = useState(false);
  const [isShowOverBoxCountriesSelected, setIsShowOverBoxCountriesSelected] = useState(false);
  const {getCountries, countries, onSelectCountry, onResetSelectedCounties, loading, error} = useCountries();

  const isSomeSelected = countries.some((v) => v.selected);

  const handleInputChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  const handleOpenShowOverBox = () => {
    setShowOverBox(true);
  };

  const handleCloseShowOverBox = () => {
    setShowOverBox(false);
    setIsShowOverBoxCountriesSelected(false);
  };

  const handleShowCountriesSelected = () => {
    setIsShowOverBoxCountriesSelected(!isShowOverBoxCountriesSelected);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className={b()}>
      {(isShowOverBox || isShowOverBoxCountriesSelected) && (
        <>
          <Backdrop className={b('backdrop')} />
          <div className={b('over-box_wrapper')}>
            <OverBox
              countries={countries}
              error={error}
              loading={loading}
              showOnlySelected={isShowOverBoxCountriesSelected}
              filter={inputValue}
              closeOverBox={handleShowCountriesSelected}
              resetOverBox={onResetSelectedCounties}
              isShowResetBtn={isShowOverBoxCountriesSelected && 1 > 0}
              isShowOverBoxCountriesSelected={isShowOverBoxCountriesSelected}
              onToggleCountry={onSelectCountry}
            />
          </div>
        </>
      )}
      <div className={b('item_wrapper')}>
        <Input
          className={b('item_input')}
          id="search"
          name="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={t('search_by_region_or_country')}
          onFocus={handleOpenShowOverBox}
        />
      </div>
      {(isShowOverBox || isShowOverBoxCountriesSelected) && (
        <>
          {isShowOverBoxCountriesSelected && isSomeSelected && (
            <div className={b('item')}>
              <div className={b('item_btn-control')} onClick={onResetSelectedCounties}>
                {t('menu.reset')}
              </div>
            </div>
          )}

          <div className={b('item')}>
            <BtnLink
              onClick={handleShowCountriesSelected}
              isShowOverBoxCountriesSelected={isShowOverBoxCountriesSelected}
              countries={isShowOverBoxCountriesSelected ? countries.filter((item) => item.selected) : countries}
            />
          </div>

          <div onClick={handleCloseShowOverBox} className={b('item_btn')}>
            <CloseIcon />
          </div>
        </>
      )}
    </div>
  );
}
