import React from 'react';
import cn from 'classnames';

import {b} from './consts';

import './table.scss';

type Props = React.HTMLProps<HTMLTableSectionElement> & {
  className: string;
};

export function TableFooter({className, ...rest}: Props) {
  const cls = cn(b('footer'), className);
  return <tbody className={cls} {...rest} />;
}
