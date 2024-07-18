import { Request } from "express";
import { ServiceReponse } from "../../entities/interface";
import { AddressCRequest, AddressURequest,AddressParam } from "./address.entities";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const AddressCreateService = async (req: AddressCRequest): Promise<ServiceReponse> => {
    await prisma.address.create({
        data: {
            accountCol: {
                connect: {
                    id: req.users.id
                }
            },
            nameReceiver: req.body.nameReceiver,
            phoneReceiver: req.body.phoneReceiver,
            country: req.body.country,
            province: req.body.province,
            district: req.body.district,
            subDistrict: req.body.subDistrict,
            postalCode: req.body.postalCode,
            addressDetail: req.body.addressDetail,

        }
    })
    return {
        status: 200,
        message: {
            result: true,
            status: "success",
            message: "ทำการเพิ่มที่อยู่สำเร็จ",
        },
    }
}

const AddressUpdateService = async (req: AddressURequest): Promise<ServiceReponse> => {
    const checkAddress = await prisma.address.count({
        where: {
            id: req.params.id,
            accountID: req.users.id,
        }
    })
    if (checkAddress === 0) {
        return {
            status: 400,
            message: {
                result: false,
                status: "warning",
                message: "ไม่พบที่อยู่ที่ต้องการแก้ไข",
            },
        }
    }
    await prisma.address.update({
        where: {
            id: req.params.id,
        },
        data: {
            nameReceiver: req.body.nameReceiver,
            phoneReceiver: req.body.phoneReceiver,
            country: req.body.country,
            province: req.body.province,
            district: req.body.district,
            subDistrict: req.body.subDistrict,
            postalCode: req.body.postalCode,
            addressDetail: req.body.addressDetail,
        }
    })
    return {
        status: 200,
        message: {
            result: true,
            status: "success",
            message: "ทำการแก้ไขที่อยู่สำเร็จ",
        },
    }
}

const AddressDeleteService = async (req: AddressParam): Promise<ServiceReponse> => {
    const checkAddress = await prisma.address.count({
        where: {
            id: req.params.id,
            accountID: req.users.id,
        }
    })
    if (checkAddress === 0) {
        return {
            status: 400,
            message: {
                result: false,
                status: "warning",
                message: "ไม่พบที่อยู่ที่ต้องการลบ",
            },
        }
    }
   await prisma.address.update({
        where: {
            id: req.params.id,
        },
        data: {
            deletedAt: new Date()
        }
   })
    return {
        status: 200,
        message: {
            result: true,
            status: "success",
            message: "ทำการลบที่อยู่สำเร็จ",
        },
    }
}

const AddressGetService = async (req: Request): Promise<ServiceReponse> => {
    const address = await prisma.address.findMany({
        where: {
            accountID: req.users.id,
            deletedAt: null
        }
    })
    return {
        status: 200,
        message: {
            data: address,
            result: true,
            status: "success",
            message: "ดึงข้อมูลที่อยู่สำเร็จ",
        },
    }

}

const AddressGetOneService = async (req: AddressParam): Promise<ServiceReponse> => {
    const address = await prisma.address.findFirst({
        where: {
            id: req.params.id,
            accountID: req.users.id,
            deletedAt: null
        }
    })
    if (!address) {
        return {
            status: 400,
            message: {
                result: false,
                status: "warning",
                message: "ไม่พบที่อยู่ที่ต้องการ",
            },
        }
    }
    return {
        status: 200,
        message: {
            data: address,
            result: true,
            status: "success",
            message: "ดึงข้อมูลที่อยู่สำเร็จ",
        },
    }
}

export default {
    AddressCreateService,
    AddressUpdateService,
    AddressDeleteService,
    AddressGetService,
    AddressGetOneService
}