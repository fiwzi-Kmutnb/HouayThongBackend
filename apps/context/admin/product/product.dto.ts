import { body, param } from "express-validator";
import validate from "../../../utils/validate";

export default {
    ProductCreateDTO: validate([
        body('name').notEmpty().withMessage('กรุณากรอกชื่อสินค้า'),
        body('price').notEmpty().withMessage('กรุณากรอกราคาสินค้า').isNumeric().withMessage('กรุณากรอกราคาสินค้าเป็นตัวเลขเท่านั้น'),
        body('category').notEmpty().withMessage('กรุณาเลือกหมวดหมู่สินค้า'),
        body('description').notEmpty().withMessage('กรุณากรอกรายละเอียดสินค้า'),
        body('image').notEmpty().withMessage('กรุณาเลือกรูปภาพสินค้า'),
        body('quantity').notEmpty().withMessage('กรุณากรอกจำนวนสินค้า').isNumeric().withMessage('กรุณากรอกจำนวนสินค้าเป็นตัวเลขเท่านั้น'),
    ]),
    ProctUpdateDTO: validate([
        param('id').notEmpty().withMessage('กรุณากรอก id ที่ต้องการแก้ไข').isNumeric().withMessage('กรุณากรอก id เป็นตัวเลขเท่านั้น'),
        body('name').notEmpty().withMessage('กรุณากรอกชื่อสินค้า'),
        body('price').notEmpty().withMessage('กรุณากรอกราคาสินค้า').isNumeric().withMessage('กรุณากรอกราคาสินค้าเป็นตัวเลขเท่านั้น'),
        body('category').notEmpty().withMessage('กรุณาเลือกหมวดหมู่สินค้า'),
        body('description').notEmpty().withMessage('กรุณากรอกรายละเอียดสินค้า'),
        body('image').notEmpty().withMessage('กรุณาเลือกรูปภาพสินค้า'),
        body('quantity').notEmpty().withMessage('กรุณากรอกจำนวนสินค้า').isNumeric().withMessage('กรุณากรอกจำนวนสินค้าเป็นตัวเลขเท่านั้น'),
    ]),
    ProductParam: validate([
        param('id').notEmpty().withMessage('กรุณากรอก id ที่ต้องการลบ').isNumeric().withMessage('กรุณากรอก id เป็นตัวเลขเท่านั้น'),
    ])
}