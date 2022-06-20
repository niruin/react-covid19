import React, {useEffect} from 'react';

import {bem} from 'common/bem';

import {SummaryTable} from './summary-table';

import './summary.scss';

const b = bem('summary');

export function Summary() {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return function viewScroll() {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div className={b()}>
      <SummaryTable />
    </div>
  );
}
