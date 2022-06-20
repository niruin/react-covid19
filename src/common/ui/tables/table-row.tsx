import React from 'react';
import cn from 'classnames';

import {b} from './consts';

import './table.scss';

type Props = React.HTMLProps<HTMLTableRowElement> & {
  className?: string;
};

export function TableRow({className, ...rest}: Props) {
  const clickable = Boolean(rest.onClick);
  const cls = cn(b('row', {clickable}), className);

  return <tr className={cls} {...rest} />;
}
