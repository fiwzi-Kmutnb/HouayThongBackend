import { Request } from "express";
import { PrismaClient } from '@prisma/client'
import { ServiceReponse } from "../../../entities/interface";
import { ProductCRequest, ProductParam, ProductURequest } from "./product.entities";
const prisma = new PrismaClient()

export default {
    ProductGetService: async (req: Request): Promise<ServiceReponse> => {
        return {
            status: 200,
            message: {
                result: true,
                status: "success",
                message: "ดึงข้อมูลสำเร็จ",
                data: await prisma.products.findMany()
            }
        }
    },
    ProductGetByIdService: async (req: ProductParam): Promise<ServiceReponse> => {
        const { id } = req.params;
        const c = await prisma.products.findUnique({
            where: {
                id
            }
        })
        if (!c) {
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "ไม่พบข้อมูล",
                    data: null
                }
            }
        }
        return {
            status: 200,
            message: {
                result: true,
                status: "success",
                message: "ดึงข้อมูลสำเร็จ",
                data: c
            }
        }
    },
    ProductCreateService: async (req: ProductCRequest): Promise<ServiceReponse> => {
        const { name, price, category_id, description, quantity } = req.body

        // req.files

        const c = await prisma.products.create({
            data: {
                name,
                price,
                categoryID: category_id,
                description,
                quantity,
                mainImage: "https://via.placeholder.com/150",
                subImage: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
            }
        })
        if (c) {
            return {
                status: 200,
                message: {
                    result: true,
                    status: "success",
                    message: "ทำการเพิ่มสินค้าสำเร็จ",
                }
            }
        }
        return {
            status: 400,
            message: {
                result: false,
                status: "error",
                message: "ทำการเพิ่มสินค้าไม่สำเร็จ",
            }
        }
    },

}