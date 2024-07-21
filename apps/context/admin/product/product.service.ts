import { Request } from "express";
import { PrismaClient } from '@prisma/client'
import { ServiceReponse } from "../../../entities/interface";
import { ProductCRequest, ProductParam, ProductURequest } from "./product.entities";
import { UploadedFile } from "express-fileupload";
import { generate } from 'randomstring';
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
        const { mainImage, subImage } = req.files as { mainImage: UploadedFile | null, subImage: UploadedFile | UploadedFile[] | null };
        let MainImage: string = "";
        let SubImage: string[] = [];
        if (!mainImage)
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "กรุณาอัพโหลดไฟล์รูปภาพโชว์",
                }
            }
        if (!subImage)
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "กรุณาอัพโหลดไฟล์รูปภาพเพิ่มเติม",
                }
            }
        if (Array.isArray(mainImage))
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "กรุณาอัพโหลดไฟล์รูปภาพโชว์แค่ 1 ไฟล์",
                }
            }
            
            MainImage = `${generate(20)}.${mainImage.mimetype.split("/")[1]}`;

           await mainImage?.mv(`./storage/${MainImage}`, (err) => {
                if (err) {
                    return {
                        status: 400,
                        message: {
                            result: false,
                            status: "error",
                            message: "ไม่สามารถอัพโหลดไฟล์รูปภาพโชว์ได้",
                        }
                    }
                }
            })
        if (Array.isArray(subImage)) {
            subImage.forEach((file) => {
                SubImage.push(`${generate(20)}.${file.mimetype.split("/")[1]}`);
                 file?.mv(`./storage/${SubImage[SubImage.length - 1]}`, (err) => {
                    if (err) {
                        return {
                            status: 400,
                            message: {
                                result: false,
                                status: "error",
                                message: "ไม่สามารถอัพโหลดไฟล์รูปภาพเพิ่มเติมได้",
                            }
                        }
                    }
                })
            })
        } else {
            SubImage.push(`${generate(20)}.${subImage.mimetype.split("/")[1]}`);
            subImage.mv(`./storage/${SubImage[0]}`, (err) => {
                if (err) {
                    return {
                        status: 400,
                        message: {
                            result: false,
                            status: "error",
                            message: "ไม่สามารถอัพโหลดไฟล์รูปภาพเพิ่มเติมได้",
                        }
                    }
                }
            })
        }

        const c = await prisma.products.create({
            data: {
                name,
                price: parseFloat(price),
                categoryID: category_id,
                description,
                quantity: parseInt(quantity),
                mainImage: MainImage,
                subImage: SubImage,
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
    ProductUpdateService: async (req: ProductURequest): Promise<ServiceReponse> => {
        const { id } = req.params
        const { name, price, category_id, description, quantity, filterImage } = req.body
        const { mainImage, subImage } = req.files as { mainImage: UploadedFile | null, subImage: UploadedFile | UploadedFile[] | null };
        let MainImage: string = "";
        let SubImage: string[] = [];
        const check = await prisma.products.findUnique({
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
                    message: "ไม่พบสินค้าที่ต้องการแก้ไข",
                }
            }
        }
        if(mainImage) {
            if (Array.isArray(mainImage))
                return {
                    status: 400,
                    message: {
                        result: false,
                        status: "error",
                        message: "กรุณาอัพโหลดไฟล์รูปภาพโชว์แค่ 1 ไฟล์",
                    }
                }
            MainImage = `${generate(20)}.${mainImage.mimetype.split("/")[1]}`;
            await mainImage?.mv(`./storage/${MainImage}`, (err) => {
                if (err) {
                    return {
                        status: 400,
                        message: {
                            result: false,
                            status: "error",
                            message: "ไม่สามารถอัพโหลดไฟล์รูปภาพโชว์ได้",
                        }
                    }
                }
            })
        }
        if(subImage) {
            if (Array.isArray(subImage)) {
                subImage.forEach((file) => {
                    SubImage.push(`${generate(20)}.${file.mimetype.split("/")[1]}`);
                    file?.mv(`./storage/${SubImage[SubImage.length - 1]}`, (err) => {
                        if (err) {
                            return {
                                status: 400,
                                message: {
                                    result: false,
                                    status: "error",
                                    message: "ไม่สามารถอัพโหลดไฟล์รูปภาพเพิ่มเติมได้",
                                }
                            }
                        }
                    })
                })
            } else {
                SubImage.push(`${generate(20)}.${subImage.mimetype.split("/")[1]}`);
                subImage.mv(`./storage/${SubImage[0]}`, (err) => {
                    if (err) {
                        return {
                            status: 400,
                            message: {
                                result: false,
                                status: "error",
                                message: "ไม่สามารถอัพโหลดไฟล์รูปภาพเพิ่มเติมได้",
                            }
                        }
                    }
                })
            }
        }
        if(filterImage && filterImage.length > 0)
        check.subImage = check.subImage.filter((e) => {
            if (filterImage.includes(e)) {
                return false
            }
            return true
        })
        check.subImage = check.subImage.concat(SubImage)
        await prisma.products.update({
            where: {
                id
            },
            data: {
                name,
                price: parseFloat(price),
                categoryID: category_id,
                description,
                quantity: parseInt(quantity),
                mainImage: MainImage ? MainImage : check.mainImage,
                subImage: check.subImage,
            }
        })

        return {
            status: 200,
            message: {
                result: true,
                status: "success",
                message: "ทำการแก้ไขสินค้าสำเร็จ",
            }
        }
    },
    ProductDeleteService: async (req: ProductParam): Promise<ServiceReponse> => {
        const { id } = req.params
        const check = await prisma.products.findUnique({
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
                    message: "ไม่พบสินค้าที่ต้องการลบ",
                }
            }
        }
        await prisma.products.update({
            where: {
                id
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
                message: "ทำการลบสินค้าสำเร็จ",
            }
        }
    }

}