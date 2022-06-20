import React from 'react';
import cn from 'classnames';

import {bem} from '../../bem';

import './buttons-group.scss';

const b = bem('buttons-group');

type Props = React.HTMLProps<HTMLDivElement> & {
  className: string;
};

export function ButtonsGroup({className, ...rest}: Props) {
  const cls = cn(b(), className);
  return <div className={cls} {...rest} />;
}
