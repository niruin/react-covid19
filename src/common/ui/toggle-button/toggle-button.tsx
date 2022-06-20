import React from 'react';

import {bem} from '../../bem';
import './toggle-button.scss';

const b = bem('toggle-button');

type Props = {
  checked: boolean;
  onClick: () => void;
};

export function ToggleButton({onClick, checked}: Props) {
  const handleToggle = () => {
    onClick();
  };

  return <input onChange={handleToggle} type="checkbox" checked={checked} className={b()} />;
}
