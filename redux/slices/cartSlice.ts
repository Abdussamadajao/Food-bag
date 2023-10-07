import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Cart {
  _id: any;
  image: string;
  name: string;
  price: number;
  count: number;
}

type CartState = {
  items: Cart[];
};
const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart | any>) => {
      const foundItem = state.items.find(
        (item: Cart) => item._id === action.payload._id
      );

      if (foundItem) {
        foundItem.count;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item: Cart) => item._id !== action.payload._id
      );
    },
    increment: (state, action: PayloadAction) => {
      state.items = state.items.map((item: Cart) => {
        if (item._id === action.payload) {
          item.count++;
        }
        return item;
      });
    },
    decrement: (state, action: PayloadAction) => {
      state.items = state.items
        .map((item) => {
          if (item._id === action.payload) {
            item.count--;
          }
          return item;
        })
        .filter((item: Cart) => item.count !== 0);
    },
  },
});
export const { addToCart, removeFromCart, decrement, increment } =
  cartSlice.actions;
export default cartSlice.reducer;
