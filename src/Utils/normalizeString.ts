export const normalizeString = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, ' ')
    .replace('hellip', '') // &hellip; (ellipsis)  Their HTML seems to be broken
    .trim()
