import React from 'react';
import cn from 'classnames';

import {b} from './consts';

import './table.scss';

type Props = React.HTMLProps<HTMLTableSectionElement> & {
  className: string;
};

export function TableBody({className, ...rest}: Props) {
  const cls = cn(b('body'), className);
  return <tbody className={cls} {...rest} />;
}
