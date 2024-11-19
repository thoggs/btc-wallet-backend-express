import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {asyncHandler} from "../../../shared/utils/asyncHandler";
import {SequelizeUserRepository} from "../../persistence/repositories/SequelizeUserRepository";
import {SignupUser} from "../../../application/usecases/auth/SignupUser";
import {SigninUser} from "../../../application/usecases/auth/SigninUser";

export class AuthController {
    private readonly userRepository: SequelizeUserRepository;

    constructor() {
        this.userRepository = new SequelizeUserRepository();
    }

    signup = asyncHandler(async (req: Request, res: Response) => {
        const signupUser = new SignupUser(this.userRepository);

        const result = await signupUser.execute(req.body);

        res.status(StatusCodes.CREATED).json(result);
    });

    signin = asyncHandler(async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const signinUser = new SigninUser(this.userRepository);

        const result = await signinUser.execute(email, password);

        res.status(StatusCodes.OK).json(result);
    });
}
