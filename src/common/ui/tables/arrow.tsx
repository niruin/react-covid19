import React from 'react';
import cn from 'classnames';

import {ReactComponent as ArrowIcon} from 'assets/svg/arrow_small.svg';
import {IOrder} from 'common/types';
import {bem} from 'common/bem';

const b = bem('arrow');

type IArrowProps = React.HTMLProps<HTMLDivElement> & {
  className?: string;
  order?: IOrder;
  name?: string;
};

export function Arrow({order, name, className, ...rest}: IArrowProps) {
  const cls = cn(
    b(),
    {
      'arrow--dir-down': name === order?.fieldName && order?.type === 'asc',
      'arrow--dir-up': name === order?.fieldName && order?.type === 'desc',
    },
    className,
  );

  return (
    <div className={cls} {...rest}>
      <ArrowIcon />
    </div>
  );
}
