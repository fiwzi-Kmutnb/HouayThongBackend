import { body, param } from "express-validator";
import validate from "../../../utils/validate";

export default {
    CategoryCDTO: validate([
        body('name').notEmpty().withMessage('กรุณากรอกชื่อหมวดหมู่สินค้า'),
    ]),
    CategoryEDTO: validate([
        param('id').notEmpty().withMessage('กรุณากรอก id ที่ต้องการลบ').isNumeric().withMessage('กรุณากรอก id เป็นตัวเลขเท่านั้น'),
        body('name').notEmpty().withMessage('กรุณากรอกชื่อหมวดหมู่สินค้า'),
    ]),
    CategoryDDTO: validate([
        param('id').notEmpty().withMessage('กรุณากรอก id ที่ต้องการลบ').isNumeric().withMessage('กรุณากรอก id เป็นตัวเลขเท่านั้น'),
    ])
}