import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Link, Route} from 'react-router-dom';

import {ThemeContext, ThemeContextType} from 'common/context';
import {bem} from 'common/bem';

import './navbar.scss';

const b = bem('navbar');

type Props = {
  onClose: () => void;
  label: string;
  to: string;
  i18key: string;
  exact?: boolean;
};

export function NavbarLinksItem({onClose, label, to, exact, i18key}: Props) {
  const {t} = useTranslation();
  const {theme}: ThemeContextType = useContext(ThemeContext);
  const bt = bem('navbar', theme);

  return (
    <Route path={to} exact={exact}>
      {({match}) => {
        const tabIndex = match ? -1 : undefined;

        return (
          <li onClick={onClose} title={label}>
            <Link className={bt('line')} to={to} tabIndex={tabIndex}>
              <span className={b('line_label')}>{t(i18key)}</span>
            </Link>
          </li>
        );
      }}
    </Route>
  );
}
