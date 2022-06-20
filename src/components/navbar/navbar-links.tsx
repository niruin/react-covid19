import React from 'react';

import {NavLinks} from 'common/types';

import {NavbarLinksItem} from './navbar-links-item';

type Props = {
  links: NavLinks;
  onClose: () => void;
};

export function NavbarLinks({links, onClose}: Props) {
  return (
    <>
      {links.map(({path, label: title, exact, i18key}) => (
        <NavbarLinksItem onClose={onClose} key={path} to={path} exact={exact} label={title} i18key={i18key} />
      ))}
    </>
  );
}
