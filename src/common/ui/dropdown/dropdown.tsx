import React, {useState, useCallback, ReactNode} from 'react';

import {Button} from 'common/ui/button';
import {Options, Option, Theme} from 'common/types';
import {useOutsideClick} from 'common/hooks/use-outside-click';
import {bem} from 'common/bem';
import {ReactComponent as ChevronIcon} from 'assets/svg/ic_chevron.svg';

import {Input} from '../input';

import './dropdown.scss';

const bs = bem('dropdown');

type Props<T> = {
  options: Options<T>;
  value?: string;
  onChange?: (value?: any) => void;
  label?: string;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  onOptionClick?: (value?: T) => void;
  theme?: Theme;
  loadingOptions?: boolean;
};

export function Dropdown<T>({
  options,
  label,
  disabled,
  icon,
  onClick,
  onOptionClick,
  value,
  onChange,
  theme,
  loadingOptions,
}: Props<T>) {
  const b = theme === 'dark' ? bem('dropdown', theme) : bs;
  const [toggled, setToggled] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    if (onClick) {
      onClick();
    }
    setToggled((s) => !s);
  }, [onClick]);

  const handleClose = useCallback(() => {
    setToggled(false);
  }, []);

  const handleOptionClick = useCallback(
    (option: Option<T>) => {
      if (onOptionClick) {
        onOptionClick(option.value);
      }
      handleClose();
    },
    [onOptionClick, handleClose],
  );

  const outsideClickRef = useOutsideClick<HTMLDivElement>(() => {
    handleClose();
  });

  return (
    <div className={b({opened: toggled})} ref={outsideClickRef}>
      {toggled && (
        <div className={b('list-wrapper')}>
          {onChange && <Input className={b('input')} value={value} onChange={(value) => onChange(value)} />}
          <ul>
            {loadingOptions && <div className={b('list-item')}>loading...</div>}
            {options.map((option, index) => (
              <Suggestion key={index} option={option} onSelect={handleOptionClick} className={b('list-item')} />
            ))}
          </ul>
        </div>
      )}
      <Button disabled={disabled} className={b('btn', {expand: toggled})} onClick={handleToggle}>
        {icon && <span className={b('btn-icon')}>{icon}</span>}
        <span className={b('btn-text')}>{label}</span>
        <ChevronIcon />
      </Button>
    </div>
  );
}

Dropdown.defaultProps = {
  label: '',
};

type SuggestionProps<T> = {
  option: Option<T>;
  onSelect: (option: Option<T>) => void;
  className?: string;
};

function Suggestion<T>(props: SuggestionProps<T>) {
  const {option, onSelect, className} = props;

  const handleSelect = useCallback(() => {
    onSelect(option);
  }, [option, onSelect]);

  return (
    <li className={className} onClick={handleSelect}>
      {option.label}
    </li>
  );
}
