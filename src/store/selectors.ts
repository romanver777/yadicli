import { TRootState } from "./store";

export const auth = (state: TRootState) => state.auth.auth;

export const getItems = (state: TRootState) => state.data.data?._embedded.items;

export const getTotal = (state: TRootState) => state.data.data?._embedded.total;
