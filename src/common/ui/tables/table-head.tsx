import React from 'react';
import cn from 'classnames';

import {b} from './consts';

import './table.scss';

type Props = React.HTMLProps<HTMLTableSectionElement> & {
  className: string;
};

export function TableHead({className, ...rest}: Props) {
  const cls = cn(b('head'), className);
  return <thead className={cls} {...rest} />;
}
