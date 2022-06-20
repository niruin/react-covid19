import React from 'react';
import cn from 'classnames';

import {b} from './consts';

import './table.scss';

type Props = React.HTMLProps<HTMLTableCaptionElement> & {
  className: string;
};

export function TableCaption({className, ...rest}: Props) {
  const cls = cn(b('caption'), className);
  return <caption className={cls} {...rest} />;
}
