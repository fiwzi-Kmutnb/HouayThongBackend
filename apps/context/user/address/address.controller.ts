import express, { Request, Response } from 'express';
import DTO from './address.dto';
import isLogin from '../../../middleware/isLogin';
import type { AddressParam, AddressCRequest, AddressURequest } from './address.entities';
import addressService from './address.service';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { status, message } = await addressService.AddressGetService(req);
    return res.status(status).json(message);
});

router.get('/:id', async (req: AddressParam, res: Response) => {
    const { status, message } = await addressService.AddressGetOneService(req);
    return res.status(status).json(message);
});

router.post('/', DTO.AddressCDTO ,async (req: AddressCRequest, res: Response) => {
    const { status, message } = await addressService.AddressCreateService(req);
    return res.status(status).json(message);
});

router.put('/',DTO.AddressUDTO, async (req: AddressURequest, res: Response) => {
    const { status, message } = await addressService.AddressUpdateService(req);
    return res.status(status).json(message);

});

router.delete('/',DTO.AddressDDTO, async(req: AddressParam,res: Response) => {
    const { status, message } = await addressService.AddressDeleteService(req);
    return res.status(status).json(message);

});
module.exports = router;