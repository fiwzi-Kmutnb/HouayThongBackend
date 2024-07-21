import express, {Request, Response} from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
import { CategoryCRequest, CategoryURequest, CategoryParam } from "./category.entities";
import categoryService from './category.service';
const app = express();
const router = express.Router();
const prisma = new PrismaClient()

router.get('/', async (req: Request, res: Response) => {
    const { status, message } = await categoryService.CategoryGetService(req);
    return res.status(status).json(message);
})

router.get('/:id', async (req: CategoryParam, res: Response) => {
    const { status, message } = await categoryService.CategoryGetOneService(req);
    return res.status(status).json(message);
})

router.post('/', async (req: CategoryCRequest, res: Response) => {
    const { status, message } = await categoryService.CategoryCreateService(req);
    return res.status(status).json(message);
})

router.put('/',async (req: CategoryURequest,res: Response) => {
    const { status, message } = await categoryService.CategoryUpdateService(req);
    return res.status(status).json(message);
})

router.delete('/',async(req: CategoryParam,res: Response) => {
    const { status, message } = await categoryService.CategoryDeleteService(req);
    return res.status(status).json(message);
})

module.exports = router;