import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {asyncHandler} from "../../../shared/utils/asyncHandler";
import {SequelizeUserRepository} from "../../persistence/repositories/SequelizeUserRepository";
import {SignupUser} from "../../../application/usecases/auth/SignupUser";
import {SigninUser} from "../../../application/usecases/auth/SigninUser";

const authController = {
    signup: asyncHandler(async (req: Request, res: Response) => {
        const userRepository = new SequelizeUserRepository();
        const signupUser = new SignupUser(userRepository);

        const result = await signupUser.execute(req.body);

        res.status(StatusCodes.CREATED).json(result);
    }),

    signin: asyncHandler(async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const userRepository = new SequelizeUserRepository();
        const signinUser = new SigninUser(userRepository);

        const result = await signinUser.execute(email, password);

        res.status(StatusCodes.OK).json(result);
    }),
};

export default authController;
