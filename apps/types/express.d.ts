import { User } from "../entities/interface"
declare global {
    namespace Express {
        interface Request {
            users: User
        }
    }
}