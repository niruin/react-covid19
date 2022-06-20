import React from 'react';
import cn from 'classnames';

import {bem} from 'common/bem';

import './button.scss';

type ElementProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type OwnProps = {
  className: string;
  kind?: 'primary' | 'danger';
  size?: 'big';
};

export type Props = ElementProps & OwnProps;

const b = bem('btn');

export function Button({className, kind, size, ...rest}: Props) {
  const cls = cn(b({kind, size}), className);
  return <button className={cls} {...rest} />;
}
