import {Indexed, Theme} from 'common/types';

type TMods = Indexed<boolean | string | undefined>;
type TArgs = [] | [string | TMods] | [string | TMods, TMods];

function createModifiers(block: string, mods: TMods) {
  return Object.entries(mods).reduce((acc, [key, val]) => {
    if (typeof val === 'string') {
      return `${acc} ${block}--${key}-${val}`;
    }

    return val ? `${acc} ${block}--${key}` : acc;
  }, '');
}

function setThemeMod(block: string, theme?: Theme) {
  if (!theme || theme === 'light') {
    return block;
  }
  return `${block} ${block}--${theme}`;
}

export function bem(block: string, theme?: Theme) {
  return function (...args: TArgs) {
    if (typeof args[0] === 'string') {
      const result = `${block}__${args[0]}`;
      const themeForResult = setThemeMod(result, theme);

      return args[1] ? `${themeForResult}${createModifiers(result, args[1])}` : themeForResult;
    }

    const themeForBlock = setThemeMod(block, theme);
    return args[0] ? `${themeForBlock}${createModifiers(block, args[0])}` : themeForBlock;
  };
}
