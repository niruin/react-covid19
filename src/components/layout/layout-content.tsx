import React from 'react';

import {b} from './consts';
import './layout.scss';

type Props = {
  children?: React.ReactNode;
};

export function LayoutContent({children}: Props) {
  return (
    <main className={b('content')}>
      <div className={b('content-inner')}>{children}</div>
    </main>
  );
}
