import validate from "../../../utils/validate";
import { body,param } from "express-validator";
export default {
    AddressCDTO: validate([
        body('nameReceiver').notEmpty().withMessage('กรุณากรอกชื่อผู้รับ'),
        body('phoneReceiver').notEmpty().withMessage('กรุณากรอกเบอร์โทรศัพท์ผู้รับ'),
        body('country').notEmpty().withMessage('กรุณากรอกประเทศ'),
        body('province').notEmpty().withMessage('กรุณากรอกจังหวัด'),
        body('district').notEmpty().withMessage('กรุณากรอกอำเภอ'),
        body('subDistrict').notEmpty().withMessage('กรุณากรอกตำบล'),
        body('postalCode').notEmpty().withMessage('กรุณากรอกรหัสไปรษณีย์').isNumeric().withMessage('กรุณากรอกรหัสไปรษณีย์เป็นตัวเลขเท่านั้น'),
        body('addressDetail').notEmpty().withMessage('กรุณากรอกที่อยู่'),
    ]),
    AddressUDTO: validate([
        param('id').notEmpty().withMessage('กรุณากรอก id ที่ต้องการแก้ไข').isNumeric().withMessage('กรุณากรอก id เป็นตัวเลขเท่านั้น'),
        body('nameReceiver').notEmpty().withMessage('กรุณากรอกชื่อผู้รับ'),
        body('phoneReceiver').notEmpty().withMessage('กรุณากรอกเบอร์โทรศัพท์ผู้รับ'),
        body('country').notEmpty().withMessage('กรุณากรอกประเทศ'),
        body('province').notEmpty().withMessage('กรุณากรอกจังหวัด'),
        body('district').notEmpty().withMessage('กรุณากรอกอำเภอ'),
        body('subDistrict').notEmpty().withMessage('กรุณากรอกตำบล'),
        body('postalCode').notEmpty().withMessage('กรุณากรอกรหัสไปรษณีย์').isNumeric().withMessage('กรุณากรอกรหัสไปรษณีย์เป็นตัวเลขเท่านั้น'),
        body('addressDetail').notEmpty().withMessage('กรุณากรอกที่อยู่'),
    ]),
    AddressDDTO: validate([
        param('id').notEmpty().withMessage('กรุณากรอก id ที่ต้องการลบ').isNumeric().withMessage('กรุณากรอก id เป็นตัวเลขเท่านั้น'),
    ])
}