import express, { Request, Response } from 'express';
// import { Prisma, PrismaClient } from '@prisma/client'
import DTO from './address.dto';
import isLogin from '../../middleware/isLogin';
import type { AddressParam, AddressCRequest, AddressRequest } from './address.entities';
const app = express();
const router = express.Router();
// const prisma = new PrismaClient()

router.get('/',isLogin, async (req: Request, res: Response) => {

});

router.get('/:id',isLogin, async (req: AddressParam, res: Response) => {

});

router.post('/',isLogin, DTO.AddressCDTO ,async (req: AddressRequest, res: Response) => {

});

router.put('/',isLogin,DTO.AddressUDTO, async (req: AddressCRequest, res: Response) => {

});

router.delete('/',isLogin,DTO.AddressDDTO, async(req: AddressParam,res: Response) => {

})

module.exports = router;