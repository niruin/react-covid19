import React from 'react';
import cn from 'classnames';

import {b} from './consts';

import './table.scss';

type ElementProps = React.HTMLProps<HTMLTableElement>;

type OwnProps = {
  className?: string;
  fixed?: boolean;
};

type Props = ElementProps & OwnProps;

export function Table({fixed, className, children, ...rest}: Props) {
  const cls = cn(b({fixed}), className);
  return (
    <table className={cls} {...rest}>
      {children}
    </table>
  );
}
