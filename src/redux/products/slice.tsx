import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Filter, Product } from '../../types/global';
import type { AllProductsData } from '../../utils/api';
import { loadProducts } from './operations';

type ProductsState = {
  items: Product[];
  favouriteProducts: string[];
  filter: Filter;
  totalItems: number;
  isLoading: boolean;
};

const initialState: ProductsState = {
  items: [],
  favouriteProducts: [],
  filter: { page: 1, perPage: 2 },
  totalItems: 0,
  isLoading: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts(state) {
      state.items = [];
      state.totalItems = 0;
    },

    setFilter(state, action) {
      Object.assign(state.filter, action.payload);
    },

    removeFilter(state, action: PayloadAction<keyof Filter>) {
      delete state.filter[action.payload];
    },

    incrementPage(state) {
      state.filter.page = state.filter.page + 1;
    },

    toggleFavouriteProduct(state, action) {
      const id = action.payload;

      if (state.favouriteProducts.includes(id)) {
        state.favouriteProducts = state.favouriteProducts.filter(
          favId => favId !== id
        );

        return;
      }

      state.favouriteProducts.push(action.payload);
    },

    removeFavouriteProduct(state, action: PayloadAction<string>) {
      state.favouriteProducts = state.favouriteProducts.filter(
        p => p !== action.payload
      );
    },
  },

  extraReducers: builder => {
    builder.addCase(loadProducts.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder
      .addCase(
        loadProducts.fulfilled,
        (state, action: PayloadAction<AllProductsData>) => {
          const { total, items } = action.payload;

          if (state.items.length >= state.filter.page * state.filter.perPage)
            return;

          state.totalItems = total;
          state.items = [...state.items, ...items];
          state.isLoading = false;
        }
      )
      .addCase(loadProducts.rejected, state => ({
        ...state,
        isLoading: false,
      }));
  },
});

export const {
  clearProducts,
  setFilter,
  removeFilter,
  incrementPage,
  toggleFavouriteProduct,
  removeFavouriteProduct,
} = productSlice.actions;

export default productSlice.reducer;
