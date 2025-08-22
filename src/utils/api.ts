import axios from 'axios';
import type { Product } from '../types/global';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export type AllProductsData = {
  total: number;
  items: Product[];
};

export const fetchAllProducts = async (params = {}) => {
  const response = await axios.get<AllProductsData>('/campers', {params});

  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get<Product>(`/campers/${id}`);

  return response.data;
};
