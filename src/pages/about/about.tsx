import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';

import {bem} from 'common/bem';
import {ThemeContext} from 'common/context';

import './about.scss';

export function About() {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  const bt = bem('about', theme);

  return (
    <div className={bt()}>
      <div className={bt('container')}>
        <h1>{t('about.title')}</h1>
        <p>{t('about.paragraph.text1')}</p>
        <p>{t('about.paragraph.text2')}</p>
        <p className={bt('title')}>{t('about.paragraph.text3')}</p>
        <p>{t('about.paragraph.text4')}</p>
        <p>{t('about.paragraph.text5')}</p>
      </div>
    </div>
  );
}
