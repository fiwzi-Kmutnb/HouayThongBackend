import { Request } from "express";

 interface Address {
    nameReceiver: string;
    phoneReceiver: string;
    country: string;
    province: string;
    district: string;
    subDistrict: string;
    postalCode: number;
    addressDetail: string;
}

export type AddressCRequest = Request<{ id: string }, never, Address>;
export type AddressRequest = Request<never, never, Address>;
export type AddressParam = Request<{ id: string }>;
