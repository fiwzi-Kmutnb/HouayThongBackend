declare namespace Express {
    interface Request {
        users: {
            id: string;
            prefix: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            idLine: string;
        };
    }
}