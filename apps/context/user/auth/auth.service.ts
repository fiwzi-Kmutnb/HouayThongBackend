import { PrismaClient } from '@prisma/client'
import { ServiceReponse } from "../../../entities/interface";
import { AuthLoginRequest, AuthRegisterRequest,AuthProfileEditRequest } from "./auth.entities";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient()

export default {
    AuthLoginService: async (req: AuthLoginRequest): Promise<ServiceReponse> => {
        const { email, password } = req.body;
        const user = await prisma.accounts.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "ไม่พบผู้ใช้งาน",
                },
            }
        }
        if (!await argon2.verify(user.password, password)) {
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "รหัสผ่านไม่ถูกต้อง",
                },
            }
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            prefix: user.prefix,
            firstname: user.first_name,
            lastname: user.last_name,
            phone: user.phone,
            lineID: user.idLine,
        }, process.env.JWT_SECRET || "1234", { expiresIn: '30d' });

        return {
            status: 200,
            message: {
                result: true,
                status: "success",
                message: "ทำการเข้าสู่ระบบสำเร็จ",
                data: {
                    token: token
                }
            },
        }
    },
    AuthRegisterService: async (req: AuthRegisterRequest): Promise<ServiceReponse> => {
        const { email, password, firstname, lastname, lineID } = req.body;
        const user = await prisma.accounts.findFirst({
            where: {
                email: email
            }
        })

        if (user) {
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "มีอีเมลนี้ใช้งานอยู่แล้ว",
                },
            }
        }

        const hashPassword = await argon2.hash(password);
        const userCreate = await prisma.accounts.create({
            data: {
                email: email,
                password: hashPassword,
                prefix: "-",
                first_name: firstname,
                last_name: lastname,
                phone: "-",
                idLine: lineID || "-"
            }
        })

        const token = jwt.sign({
            id: userCreate.id,
            email: userCreate.email,
            prefix: userCreate.prefix,
            firstname: userCreate.first_name,
            lastname: userCreate.last_name,
            phone: userCreate.phone,
            lineID: userCreate.idLine || "-",
        }, process.env.JWT_SECRET || "1234", { expiresIn: '30d' });

        return {
            status: 200,
            message: {
                result: true,
                status: "success",
                message: "ทำการสมัครสมาชิกสำเร็จ",
                data: {
                    token: token
                }
            },
        }
    },
    AuthProfileEditService: async (req: AuthProfileEditRequest): Promise<ServiceReponse> => {
        const { prefix, firstname, lastname, phone, lineID } = req.body;
        const user = await prisma.accounts.findUnique({
            where: {
                id: req.users.id
            }
        })
        if (!user) {
            return {
                status: 400,
                message: {
                    result: false,
                    status: "error",
                    message: "ไม่พบผู้ใช้งาน",
                },
            }
        }
        const userUpdate = await prisma.accounts.update({
            where: {
                id: req.users.id
            },
            data: {
                prefix: prefix,
                first_name: firstname,
                last_name: lastname,
                phone: phone,
                idLine: lineID
            }
        })
        if (userUpdate) {
            return {
                status: 200,
                message: {
                    result: true,
                    status: "success",
                    message: "ทำการแก้ไขข้อมูลสำเร็จ",
                },
            }
        }
        return {
            status: 400,
            message: {
                result: false,
                status: "error",
                message: "ทำการแก้ไขข้อมูลไม่สำเร็จ",
            },
        }
    }
}