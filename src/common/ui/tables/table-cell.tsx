import React from 'react';
import cn from 'classnames';

import {b} from './consts';

import './table.scss';

type Props = React.HTMLProps<HTMLTableCellElement> & {
  className?: string;
};

export function TableCell({className, ...rest}: Props) {
  const cls = cn(b('cell'), className);
  return <td className={cls} {...rest} />;
}
