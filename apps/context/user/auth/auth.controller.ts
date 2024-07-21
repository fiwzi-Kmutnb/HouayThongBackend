import express,{ Response} from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
import DTO from './auth.dto';
import { AuthLoginRequest, AuthRegisterRequest } from './auth.entities';
import authService from './auth.service';
const app = express();
const router = express.Router();
const prisma = new PrismaClient()

router.post('/login',DTO.AuthLoginDTO, async (req: AuthLoginRequest, res: Response) => {
    const { status, message } = await authService.AuthLoginService(req);
    return res.status(status).json(message);
})

router.post('/register',DTO.AuthRegisterDTO, async (req: AuthRegisterRequest, res: Response) => {
    const { status, message } = await authService.AuthLoginService(req);
    return res.status(status).json(message);
})

module.exports = router;