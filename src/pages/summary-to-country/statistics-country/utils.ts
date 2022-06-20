export const formatNumber = (num: number | string | undefined | null, sign?: string): string => {
  if (num === undefined || num === null) return '';

  const number = typeof num === 'string' ? parseFloat(num) : num;

  const residueCount = number.toString().length % 3;
  const restStr = number.toString().substr(0, residueCount);
  const baseStr = (
    number
      .toString()
      .substr(residueCount)
      .match(/.{1,3}/g) || []
  ).join(' ');

  const space = restStr.length > 0 ? ' ' : '';

  const result = [restStr, space, baseStr].join('');

  return (sign ? sign : '').concat(result);
};
