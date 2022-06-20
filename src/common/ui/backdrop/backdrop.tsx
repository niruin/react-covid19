import React from 'react';
import cn from 'classnames';

import {bem} from '../../bem';

import './backdrop.scss';

const b = bem('backdrop');

type Props = React.HTMLProps<HTMLDivElement> & {
  className?: string;
  expire?: boolean;
};

export function Backdrop({expire, className, ...props}: Props) {
  const cls = cn(b({disappear: expire}), className);

  return <div className={cls} {...props} />;
}
