import { ObjectId } from "mongodb";

export type Product = {
    _id: ObjectId;
    name: string;
    price: number;
    category: string;
    stock: number;
};