import express, {Response, Request} from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
import productDto from './product.dto';
import { ProductCRequest,ProductParam,ProductURequest } from './product.entities';
import { FileArray, UploadedFile } from 'express-fileupload';
import productService from './product.service';

const app = express();
const router = express.Router();
const prisma = new PrismaClient()

router.get('/', async (req: Request, res: Response) => {
    const { status, message } = await productService.ProductGetService(req);
    return res.status(status).json(message);
})

router.get('/:id', async (req: ProductParam, res: Response) => {
    const { status, message } = await productService.ProductGetByIdService(req);
    return res.status(status).json(message);
})

router.post('/',productDto.ProductCreateDTO, async (req: ProductCRequest, res: Response) => {
    const { status, message } = await productService.ProductCreateService(req);
    return res.status(status).json(message);
})

router.put('/:id', async (req: ProductURequest, res: Response) => {
    const { status, message } = await productService.ProductUpdateService(req);
    return res.status(status).json(message);
})

router.delete('/:id', async (req: ProductParam, res: Response) => {
    const { status, message } = await productService.ProductDeleteService(req);
    return res.status(status).json(message);
})

module.exports = router;