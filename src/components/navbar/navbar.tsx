import React, {useContext, useState} from 'react';
import i18n, {changeLanguage} from 'i18next';
import {useTranslation} from 'react-i18next';

import {AvailableLanguages, NavLinks} from 'common/types';
import {ToggleButton} from 'common/ui/toggle-button';
import {Underlink} from 'common/ui/underlink';
import {bem} from 'common/bem';
import {ThemeContext, ThemeContextType} from 'common/context';
import {ReactComponent as CrossIcon} from 'assets/svg/ic_close.svg';
import {ReactComponent as FlagIconEn} from 'assets/svg/flags/ic_flag_en.svg';
import {ReactComponent as FlagIconRu} from 'assets/svg/flags/ic_flag_ru.svg';

import {NavbarLinks} from './navbar-links';
import {availableLanguages} from '../../i18n';

import './navbar.scss';

const b = bem('navbar');

type Props = {
  links: NavLinks;
  onClose: () => void;
};

function getDefaultLangNativeNameString(): string {
  const langDefault = availableLanguages.find((item) => {
    return item.shortName === i18n.resolvedLanguage;
  });

  return langDefault?.nativeName || availableLanguages[0].lang;
}

export function Navbar({links, onClose}: Props) {
  const {t, i18n} = useTranslation();
  const {theme, toggleTheme}: ThemeContextType = useContext(ThemeContext);
  const bt = bem('navbar', theme);

  const [isLangBarOpen, setLangBarOpen] = useState(false);

  function handleClickLangBtn() {
    setLangBarOpen(!isLangBarOpen);
  }

  function handleChangeLang(language: AvailableLanguages) {
    changeLanguage(language.shortName);
    setLangBarOpen(!isLangBarOpen);
  }

  return (
    <nav className={b()}>
      <ul className={b('lines-wrapper')}>
        <li className={bt('line-head')}>
          <div className={b('line-items')}>
            <Underlink
              text={isLangBarOpen ? t('menu.back') : getDefaultLangNativeNameString()}
              onClick={handleClickLangBtn}
              className={b('line-items_text')}
              theme={theme}
            />
            {i18n.resolvedLanguage === 'en' && <FlagIconEn className={b('line-items_icon')} />}
            {i18n.resolvedLanguage === 'ru' && <FlagIconRu className={b('line-items_icon')} />}
          </div>
          <div onClick={onClose} className={b('line-items_close-btn')}>
            <div className={b('line-items_close-btn_text')}>{t('menu.close')}</div>
            <CrossIcon className={bt('line-items_close-btn_icon')} />
          </div>
        </li>

        {isLangBarOpen && (
          <>
            {availableLanguages.map((item) => {
              return (
                <div onClick={() => handleChangeLang(item)} className={bt('line')} key={item.lang}>
                  <span className={b('line_label')}>{item.nativeName}</span>
                </div>
              );
            })}
          </>
        )}

        {!isLangBarOpen && <NavbarLinks links={links} onClose={onClose} />}

        <li className={bt('line-footer')}>
          <div className={bt('line-footer_text')}>
            {theme === 'light' ? t('menu.activate_black_option') : t('menu.activate_white_option')}
          </div>
          <ToggleButton onClick={toggleTheme} checked={theme === 'dark'} />
        </li>
      </ul>
    </nav>
  );
}
