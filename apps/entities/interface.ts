export interface ServiceReponse {
    status: number;
    message: {
        result: boolean;
        status: string;
        message: string;
        data?: any;
    };
}