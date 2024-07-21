export interface ServiceReponse {
    status: number;
    message: {
        result: boolean;
        status: string;
        message: string;
        data?: any;
    };
}
export interface User {
    id: string;
    prefix?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    idLine?: string;
}
