import { Request } from 'express';

interface Product {
    name: string
    price: number
    description: string
    quantity: number
    category_id: string
}

export type ProductURequest = Request<{ id: string }, never, Product>;
export type ProductCRequest = Request<never, never, Product>;
export type ProductParam = Request<{ id: string }>;