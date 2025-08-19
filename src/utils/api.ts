import axios from 'axios';
import type { Product } from '../types/global';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

type AllProductsData = {
  total: number;
  items: Product[];
};

export const fetchAllProducts = async (filter = {}) => {
  const response = await axios.get<AllProductsData>('/campers', filter);

  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get<Product>(`/campers/${id}`);

  return response.data;
};
