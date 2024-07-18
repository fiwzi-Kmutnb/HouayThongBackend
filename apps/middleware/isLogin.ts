import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export default function isLogin(req: Request<never,never,never,never,never>, res: Response, next: NextFunction) {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({
            code: 401,
            result: false,
            status: "warning",
            message: "เกิดข้อผิดพลาด"
        })
    }
    const authBearar = token.split(' ')
    const authToken = authBearar[1]
    if (authBearar[0] !== 'Bearer' || !authToken) {
        return res.status(401).json({
            code: 401,
            result: false,
            status: "warning",
            message: "เกิดข้อผิดพลาด"
        })
    }
    jwt.verify(authToken, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).json({
                code: 401,
                result: false,
                status: "warning",
                message: "กรุณาเข้าสู่ระบบใหม่"
            })
        } 
        req.users = decoded as any

        // req.users = {
        //     id: decoded?.id,
        //     prefix: decoded?.prefix,
        //     firstName: decoded?.firstname,
        //     lastName: decoded?.lastName,
        //     email: decoded?.email,
        //     phone: decoded?.phone,
        //     idLine: decoded?.idLine
        // }
        // req.users
        // req.conf
        // req.users = {
        //     id: decoded?.id,
        //     prefix: decoded?.prefix,
        //     firstName: decoded?.firstname,
        //     lastName: decoded?.lastName,
        //     email: decoded?.email,
        //     phone: decoded?.phone,
        //     idLine: decoded?.idLine
            
        // }
        next()
    })
}