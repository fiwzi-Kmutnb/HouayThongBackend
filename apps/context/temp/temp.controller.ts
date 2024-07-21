import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
const app = express();
const router = express.Router();
const prisma = new PrismaClient()



module.exports = router;