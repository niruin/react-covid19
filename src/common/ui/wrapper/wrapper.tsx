import React from 'react';
import cn from 'classnames';

import {bem} from 'common/bem';

import './wrapper.scss';

type Props = React.HTMLProps<HTMLDivElement> & {
  className?: string;
  justifyContent?: 'left' | 'space-between' | 'flex-end' | 'flex-start';
};

const b = bem('wrapper');

export function Wrapper({className, justifyContent, ...rest}: Props) {
  const cls = cn(b({justifyContent}), className);
  return <div className={cls} {...rest} />;
}
