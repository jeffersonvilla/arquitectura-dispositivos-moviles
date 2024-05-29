import { Cart } from "../model/Cart";

type User = {
    id: string;
    username: string;
    password: string;
    email: string;
    role: string;
    cart: Cart;
}

let cart : Cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

export const usersDataSource: User[] = [{id: "1", username: "admin", email: "admin@correo", 
    password: "$2a$10$FzHHR9aVCQk6lpI9ibA5POYmexzSvmDShPeEVJZsPDNlHFm0HjczK", 
    role: 'admin', cart}];