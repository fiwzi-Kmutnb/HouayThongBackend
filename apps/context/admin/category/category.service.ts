import { Request } from "express";
import { PrismaClient } from '@prisma/client'
import { ServiceReponse } from "../../../entities/interface";
import { CategoryCRequest, CategoryURequest, CategoryParam } from "./category.entities";
const prisma = new PrismaClient()



export default {
    CategoryCreateService: async (req: CategoryCRequest): Promise<ServiceReponse> => {
        const { name } = req.body
        const c = await prisma.categories.create({
            data: {
                name
            }
        })
        if (c) {
            return {
                status: 200,
                message: {
                    result: true,
                    status: "success",
                    message: "ทำการเพิ่มหมวดหมู่สำเร็จ",
                }
            }
        }
        return {
            status: 400,
            message: {
                result: false,
                status: "error",
                message: "ทำการเพิ่มหมวดหมู่ไม่สำเร็จ",
            }
        }
    },
    CategoryUpdateService: async (req: CategoryURequest): Promise<ServiceReponse> => {
        const { id } = req.params
        const { name } = req.body
        const check = await prisma.categories.findUnique({
            where: {
                id
            }
        })
        if (!check) {
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "ไม่พบหมวดหมู่ที่ต้องการแก้ไข",
                }
            }
        }
        const u = await prisma.categories.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        if (u) {
            return {
                status: 200,
                message: {
                    result: true,
                    status: "success",
                    message: "ทำการแก้ไขหมวดหมู่สำเร็จ",
                }
            }
        }
        return {
            status: 400,
            message: {
                result: false,
                status: "error",
                message: "ทำการแก้ไขหมวดหมู่ไม่สำเร็จ",
            }
        }
    },
    CategoryGetService: async (req: Request): Promise<ServiceReponse> => {
        return {
            status: 200,
            message: {
                result: true,
                status: "success",
                message: "ทำการดึงข้อมูลสำเร็จ",
                data: await prisma.categories.findMany()
            }
        }
    },
    CategoryGetOneService: async (req: CategoryParam): Promise<ServiceReponse> => {
        const { id } = req.params
        const c = await prisma.categories.findUnique({
            where: {
                id
            }
        })
        if (c) {
            return {
                status: 200,
                message: {
                    result: true,
                    status: "success",
                    message: "ทำการดึงข้อมูลสำเร็จ",
                    data: c
                }
            }
        }
        return {
            status: 400,
            message: {
                result: false,
                status: "error",
                message: "ไม่พบหมวดหมู่ที่ต้องการ",
                data: null
            }
        }
    },
    CategoryDeleteService: async (req: CategoryParam): Promise<ServiceReponse> => {
        const { id } = req.params
        const check = await prisma.categories.findUnique({
            where: {
                id
            }
        })
        if (!check) {
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "ไม่พบหมวดหมู่ที่ต้องการลบ",
                }
            }
        }
        const d = await prisma.categories.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        })
        if (d) {
            return {
                status: 200,
                message: {
                    result: true,
                    status: "success",
                    message: "ทำการลบหมวดหมู่สำเร็จ",
                }
            }
        }
        return {
            status: 400,
            message: {
                result: false,
                status: "error",
                message: "ทำการลบหมวดหมู่ไม่สำเร็จ",
            }
        }
    }
}