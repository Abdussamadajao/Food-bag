import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";
import { Action, ThunkAction } from "@reduxjs/toolkit";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export function createPersistStorage(): WebStorage {
  const isServer = typeof window === "undefined";

  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage("local");
}
