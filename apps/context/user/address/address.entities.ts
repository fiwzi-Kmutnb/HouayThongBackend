import { Request } from "express";

interface Address {
    nameReceiver: string;
    phoneReceiver: string;
    country: string;
    province: string;
    district: string;
    subDistrict: string;
    postalCode: string;
    addressDetail: string;
}

export type AddressURequest = Request<{ id: string }, never, Address>;
export type AddressCRequest = Request<never, never, Address>;
export type AddressParam = Request<{ id: string }>;
