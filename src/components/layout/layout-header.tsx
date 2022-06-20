import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';

import {Drawer} from 'common/ui/drawer';
import {ThemeContext, ThemeContextType} from 'common/context';
import {NavLinks} from 'common/types';
import {bem} from 'common/bem';
import {history} from 'common/routing';
import {useCountries} from 'services/countries';

import {SearchPanel} from '../search-panel';
import {Navbar} from '../navbar';
import {b} from './consts';

import './layout.scss';

type Props = {
  links: NavLinks;
};

export function LayoutHeader({links}: Props) {
  const {t} = useTranslation();
  const {theme}: ThemeContextType = useContext(ThemeContext);
  const bt = bem('layout', theme);
  const {pathname} = useLocation();
  const regex = new RegExp(`^/summary/`);

  const [isOpenMenu, setShowMenu] = useState(false);

  const handleToggleShowMenu = () => {
    setShowMenu(!isOpenMenu);
  };

  return (
    <header className={bt('header')}>
      <div onClick={handleToggleShowMenu} className={bt('box-left')}>
        <div className={b('header_hamburger')}>
          <div className={bt('header_hamburger-bar')} />
          <div className={bt('header_hamburger-bar')} />
          <div className={bt('header_hamburger-bar')} />
        </div>
        <div className={b('label')}>{t('menu.menu')}</div>
      </div>

      <div className={bt('box-right')}>
        {pathname === '/summary' && <SearchPanel />}
        {pathname.match(regex) && <BreadCrumbs path={pathname} />}
      </div>

      <Drawer isOpen={isOpenMenu} onClose={handleToggleShowMenu}>
        <Navbar onClose={handleToggleShowMenu} links={links} />
      </Drawer>
    </header>
  );
}

function BreadCrumbs({path}: {path: string}) {
  const {t} = useTranslation();
  const crumbs = path.slice(1).split('/');
  const {countries} = useCountries();

  const redirect = (path: string) => {
    if (path === 'summary') {
      history.push(`/summary`);
    }
  };

  function formattedBreadCrumbName(slug: string) {
    if (slug === 'summary') {
      return t('summary');
    }

    const country = countries.find((item) => item.Slug === slug);
    if (country) {
      return country.Country;
    }

    return slug;
  }

  return (
    <nav className={b('breadcrumbs')} aria-label="Breadcrumb">
      {crumbs.map((item) => (
        <div onClick={() => redirect(item)} className={b('breadcrumbs_item')} key={item}>
          {formattedBreadCrumbName(item)}
        </div>
      ))}
    </nav>
  );
}
