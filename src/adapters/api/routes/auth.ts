import {Router} from 'express';
import {AuthController} from "../controllers/AuthController";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);

export default authRouter;
