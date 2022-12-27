import { CartItem } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((acc, item) => acc + item.price * item.count, 0);
};
