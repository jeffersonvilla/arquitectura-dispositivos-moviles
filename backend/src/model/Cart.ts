import { CartItem } from "./CartItem";

export type Cart = {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
};