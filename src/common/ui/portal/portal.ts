import React from 'react';
import {createPortal} from 'react-dom';

type Props = {
  root: string;
  children: React.ReactNode;
};

export function Portal({root, children}: Props) {
  const rootElement = document.getElementById(root);

  return rootElement ? createPortal(children, rootElement) : null;
}
