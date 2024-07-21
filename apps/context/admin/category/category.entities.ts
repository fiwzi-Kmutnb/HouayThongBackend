import { Request } from 'express';

interface Category {
    name: string;
}

export type CategoryURequest = Request<{ id: string }, never, Category>;
export type CategoryCRequest = Request<never, never, Category>;
export type CategoryParam = Request<{ id: string }>;
