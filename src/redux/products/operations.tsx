import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts, type AllProductsData } from '../../utils/api';
import { clearProducts } from './slice';
import type { RootState } from '../store';
import axios from 'axios';
import toast from 'react-hot-toast';

export const loadProducts = createAsyncThunk<
  AllProductsData,
  void,
  { state: RootState }
>('pruducts/load', async (_, { rejectWithValue, dispatch, getState }) => {
  const state = getState();
  const filter = { ...state.products.filter };
  const { page } = filter;
  const { perPage, ...queryParams } = filter;

  if (page === 1) dispatch(clearProducts());

  try {
    const data = await fetchAllProducts(queryParams);

    const paginatedItems = data.items.slice(
      (page - 1) * perPage,
      (page - 1) * perPage + perPage
    );

    data.items = paginatedItems;

    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response && err.response.status === 404)
      return rejectWithValue('');

    toast.error('Something went wrong. Try again later.');
    return rejectWithValue('');
  }
});
