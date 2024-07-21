import validate from "../../../utils/validate";
import { body,CustomValidator } from "express-validator";

const passwordMatchValidator: CustomValidator = (value, { req }) => {
    return value === ((req.body) as { password: string}).password;
};

export default {
    AuthLoginDTO: validate([
        body('email').notEmpty().withMessage('กรุณากรอกอีเมล').isEmail().withMessage('กรุณากรอกอีเมลด้วย'),
        body('password').notEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({ min: 8 }).withMessage('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
    ]),
    AuthRegisterDTO: validate([
        body('email').notEmpty().withMessage('กรุณากรอกอีเมล').isEmail().withMessage('กรุณากรอกอีเมลด้วย'),
        body('password').notEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({ min: 8 }).withMessage('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
        body('cpassword').notEmpty().withMessage('กรุณากรอกรหัสผ่านอีกครั้ง').custom(passwordMatchValidator).withMessage('รหัสผ่านไม่ตรงกัน'),
        body('prefix').notEmpty().withMessage('กรุณากรอกชื่อ'),
        body('firstname').notEmpty().withMessage('กรุณากรอกชื่อ'),
        body('lastname').notEmpty().withMessage('กรุณากรอกนามสกุล'),
        body('phone').notEmpty().withMessage('กรุณากรอกเบอร์โทรศัพท์'),
        body('lineID').notEmpty().withMessage('กรุณากรอกที่อยู่'),
    ])
}