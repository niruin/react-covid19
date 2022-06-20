import React, {useEffect, useState} from 'react';

type Props = {
  delay: number;
  shown: boolean;
  children: React.ReactNode;
};

export function Expire({shown, delay, children}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shown && !visible) {
      setVisible(true);
    }
    if (visible && !shown) {
      setTimeout(() => {
        setVisible(false);
      }, delay);
    }
  }, [delay, shown, visible]);

  return visible ? <>{children}</> : null;
}
