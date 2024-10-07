import { Request } from "express";

interface AuthLogin {
    email: string;
    password: string;
}

interface AuthRegister {
    email: string;
    password: string;
    // prefix: string;
    firstname: string;
    lastname: string;
    // phone: string;
    lineID: string;
}

interface AuthProfileEdit {
    prefix: string;
    firstname: string;
    lastname: string;
    phone: string;
    lineID: string;
}

export type AuthProfileEditRequest = Request<never, never, AuthProfileEdit>;
export type AuthLoginRequest = Request<never, never, AuthLogin>;
export type AuthRegisterRequest = Request<never, never, AuthRegister>;
