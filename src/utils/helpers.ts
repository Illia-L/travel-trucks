import type { Filter } from '../types/global';

export const convertObjectToQueryString = (obj: Filter): string => {
const params = new URLSearchParams();


(Object.keys(obj) as (keyof Filter)[]).forEach((key) => {
if (key === 'page' || key === 'perPage') return;
const value = obj[key as keyof Filter];
params.append(String(key), String(value as unknown as string));
});


return `?${params.toString()}`;
};

export const formatPrice = (price:number) => `€${price.toFixed(2)}`
