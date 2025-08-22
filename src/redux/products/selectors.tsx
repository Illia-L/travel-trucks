import type { RootState } from '../store';

export const selectIsLoading = (state: RootState) => state.products.isLoading;

export const selectAllProducts = (state: RootState) => state.products.items;

export const selectFilter = (state: RootState) => state.products.filter;

export const selectVehicleFormFilter = (state: RootState) =>
  state.products.filter.form;

export const selectFavouriteProducts = (state: RootState) =>
  state.products.favouriteProducts;

export const selectHasNextPage = (state: RootState) => {
  const { page, perPage } = state.products.filter;
  const { totalItems } = state.products;

  return totalItems > page * perPage;
};


