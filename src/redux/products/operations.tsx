import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts } from '../../utils/api';
import { clearProducts } from './slice';
import type { RootState } from '../store';
import type { AxiosError } from 'axios';

export const loadProducts = createAsyncThunk<void, void, { state: RootState }>(
  'pruducts/load',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState();
    const filter = { ...state.products.filter };
    const { page, perPage } = filter;

    delete filter.perPage;

    if (page === 1) dispatch(clearProducts());

    try {
      const data = await fetchAllProducts(filter);

      const paginatedItems = data.items.slice(
        (page - 1) * perPage,
        (page - 1) * perPage + perPage
      );

      data.items = paginatedItems;

      return data;
    } catch {
      return rejectWithValue('');
    }
  }
);
