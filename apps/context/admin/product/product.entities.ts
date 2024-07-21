import { Request } from 'express';

interface Product {
    name: string
    price: string
    description: string
    quantity: string
    category_id: string
    filterImage: string[]
}

export type ProductURequest = Request<{ id: string }, never, Product>;
export type ProductCRequest = Request<never, never, Product>;
export type ProductParam = Request<{ id: string }>;