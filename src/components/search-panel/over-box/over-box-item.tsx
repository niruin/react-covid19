import React, {useContext} from 'react';
import cn from 'classnames';

import {Country} from 'services/countries/types';
import {bem} from 'common/bem';
import {ThemeContext} from 'common/context';

import './over-box.scss';

type Props = {
  country: Country;
  onToggleCountry: (slug: string) => void;
};

export function OverBoxItem({country, onToggleCountry}: Props) {
  const {theme} = useContext(ThemeContext);
  const bt = bem('over-box', theme);

  const handleSelect = () => {
    onToggleCountry(country.Slug);
  };

  const cls = cn(bt('item', {selected: country.selected}));

  return (
    <div onClick={handleSelect} className={cls}>
      {country.Country}
    </div>
  );
}
