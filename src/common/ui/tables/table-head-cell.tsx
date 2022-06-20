import React, {useState} from 'react';
import cn from 'classnames';

import {Wrapper} from 'common/ui/wrapper';
import {OrderType, IOrder} from 'common/types';

import {b} from './consts';
import {Arrow} from './arrow';

import './table.scss';

interface IProps extends React.HTMLProps<HTMLTableHeaderCellElement> {
  name?: string;
  order?: IOrder;
  justifyContent?: 'left' | 'space-between' | 'flex-end' | 'flex-start';
  onOrder?: (order: IOrder) => void;
}

export function TableHeadCell({name, order, justifyContent, onOrder, children, className, ...rest}: IProps) {
  const [orderType, setOrderType] = useState<OrderType>(false);

  const cls = cn(b('head-cell', {orderable: Boolean(onOrder)}), className);

  const handleClick = () => {
    const type = orderType === 'asc' ? 'desc' : 'asc';

    if (onOrder) {
      onOrder({type, fieldName: name});
      setOrderType(type);
    }
  };

  return (
    <th className={cls} {...rest} onClick={handleClick}>
      <Wrapper justifyContent={justifyContent}>
        {children}
        {onOrder && <Arrow order={order} name={name} />}
      </Wrapper>
    </th>
  );
}

TableHeadCell.defaultProps = {
  justifyContent: 'left',
};
