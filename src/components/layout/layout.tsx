import React, {useContext} from 'react';
import cn from 'classnames';

import {ThemeContext} from 'common/context';
import {bem} from 'common/bem';

import './layout.scss';

type Props = React.HTMLProps<HTMLDivElement> & {
  className?: string;
};

export function Layout({className, ...rest}: Props) {
  const {theme} = useContext(ThemeContext);
  const bt = bem('layout', theme);
  const cls = cn(bt(), className);

  return <div className={cls} {...rest} />;
}
