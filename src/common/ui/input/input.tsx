import React from 'react';
import cn from 'classnames';

import {bem} from '../../bem';

import './input.scss';

const b = bem('input');

type Props = React.HTMLProps<HTMLInputElement> & {
  className: string;
};

export function Input({className, ...props}: Props) {
  const cls = cn(b(), className);

  return <input className={cls} {...props} />;
}

Input.defaultProps = {
  value: '',
  autoComplete: 'off',
};
