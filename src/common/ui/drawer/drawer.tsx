import React, {useEffect} from 'react';

import {bem} from 'common/bem';

import {Portal} from '../portal';
import {Backdrop} from '../backdrop';
import {Expire} from '../expire';

import './drawer.scss';

const ESCAPE_KEY = 27;

const b = bem('drawer');

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  extra?: boolean;
};

export function Drawer({children, onClose, isOpen, extra}: Props) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = ({keyCode}: KeyboardEvent) => {
      if (keyCode === ESCAPE_KEY && isOpen) {
        handleClose();
      }
    };

    window.document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const isBigSizeCls = extra ? b('big', {disappear: !isOpen}) : b({disappear: !isOpen});

  const delay = extra ? 500 : 200;

  return (
    <Expire shown={isOpen} delay={delay}>
      <Portal root="modals">
        <Backdrop expire={!isOpen}>
          <div className={isBigSizeCls}>{children}</div>
        </Backdrop>
      </Portal>
    </Expire>
  );
}
