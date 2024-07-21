import express, {Response} from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
const app = express();
const router = express.Router();
const prisma = new PrismaClient()

router.get('/', async (req, res: Response) => {

})

router.get('/:id', async (req, res: Response) => {

})

router.post('/', async (req, res: Response) => {

})

router.put('/', async (req, res: Response) => {

})

router.delete('/', async (req, res: Response) => {

})



module.exports = router;