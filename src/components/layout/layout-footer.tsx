import React, {useContext} from 'react';

import {ThemeContext, ThemeContextType} from 'common/context';
import {bem} from 'common/bem';

import {b} from './consts';

import './layout.scss';

type Props = {
  children?: React.ReactNode;
};

export function LayoutFooter({children}: Props) {
  const {theme}: ThemeContextType = useContext(ThemeContext);
  const bt = bem('layout', theme);

  return (
    <footer className={b('footer')}>
      <div className={b('footer-inner')}>{children}</div>
      <div className={bt('footer-copyright')}>
        <div>©2022 Covid-19 INFO Версия 0.9.1</div>
      </div>
    </footer>
  );
}
