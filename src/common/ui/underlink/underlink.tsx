import React from 'react';
import cn from 'classnames';

import {bem} from '../../bem';
import {Theme} from '../../types';

import './styles.scss';

const b = bem('underlink');

type Props = {
  onClick: () => void;
  text: string;
  className?: string;
  theme?: Theme;
};

export function Underlink({className, onClick, text, theme}: Props) {
  const cls = cn(b({dark: theme === 'dark'}), className);

  return (
    <div onClick={onClick} className={cls}>
      {text}
    </div>
  );
}
