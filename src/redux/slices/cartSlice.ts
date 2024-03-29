import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice: totalPrice,
    items: items,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = state.items.reduce((acc, item) => {
                return acc + item.price * item.count;
            }, 0);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload);

            // state.totalPrice -= state.items.reduce((acc, item) => {
            //     return acc + item.price * item.count;
            // }, 0);
            // console.log();

            if (!state.items.length) {
                state.totalPrice = 0;
            }
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
