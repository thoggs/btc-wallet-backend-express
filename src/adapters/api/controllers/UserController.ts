import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import usePagination from "../utils/usePagination";
import {SequelizeUserRepository} from "../../persistence/repositories/SequelizeUserRepository";
import {ListUsers} from "../../../application/usecases/user/ListUsers";
import {asyncHandler} from "../../../shared/utils/asyncHandler";
import {CreateUser} from "../../../application/usecases/user/CreateUser";
import {GetUserById} from "../../../application/usecases/user/GetUserById";
import {UpdateUser} from "../../../application/usecases/user/UpdateUser";
import {DeleteUser} from "../../../application/usecases/user/DeleteUser";

export class UserController {
    private readonly userRepository: SequelizeUserRepository;

    constructor() {
        this.userRepository = new SequelizeUserRepository();
    }

    index = asyncHandler(async (req: Request, res: Response) => {
        const pagination = usePagination(req, ["firstName", "lastName", "email"]);
        const listUsers = new ListUsers(this.userRepository);
        const result = await listUsers.execute(pagination);

        res.status(StatusCodes.OK).send({
            data: result.data,
            pagination: result.pagination,
            success: true,
            metadata: {
                message: [],
            },
        });
    });

    create = asyncHandler(async (req: Request, res: Response) => {
        const createUser = new CreateUser(this.userRepository);
        const user = await createUser.execute(req.body);
        res.status(StatusCodes.CREATED).send(user);
    });

    show = asyncHandler(async (req: Request, res: Response) => {
        const getUserById = new GetUserById(this.userRepository);
        const user = await getUserById.execute(req.params.id);
        res.status(StatusCodes.OK).json(user);
    });

    update = asyncHandler(async (req: Request, res: Response) => {
        const updateUser = new UpdateUser(this.userRepository);
        const updatedUser = await updateUser.execute(req.params.id, req.body);
        res.status(StatusCodes.OK).json(updatedUser);
    });

    destroy = asyncHandler(async (req: Request, res: Response) => {
        const deleteUser = new DeleteUser(this.userRepository);
        await deleteUser.execute(req.params.id);
        res.status(StatusCodes.NO_CONTENT).send();
    });
}

