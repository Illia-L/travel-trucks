import type { Filter } from '../types/global';

export const convertObjectToQueryString = (obj: Filter) => {
  const objCopy = {...obj}

  delete objCopy.page
  delete objCopy.perPage

  const queryString =
    '?' +
    Object.entries(objCopy)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  return queryString;
};

export const convertSearchToObject = (search: string) => {
  const obj = {};

  search
    .slice(1)
    .split('&')
    .forEach(str => {
      const [key, value] = str.split('=');

      obj[key] = value;
    });
    
    delete obj.page
    delete obj.perPage

  return obj as Filter;
};
