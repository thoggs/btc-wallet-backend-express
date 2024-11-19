import {Router} from 'express';
import userRouter from "./users";

const apiRouter = Router();

apiRouter.use('/users', userRouter);

export default apiRouter;
