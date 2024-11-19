import {UserRepository} from "../../../domain/repositories/UserRepository";
import {User} from "../../../domain/entities/User";
import {Pagination} from "../../../shared/types/pagination";
import UserModel from "../models/UserModel";
import {UserResponseDTO} from "../../../shared/dto/UserResponseDTO";

export class SequelizeUserRepository implements UserRepository {
    async findAll(pagination: Pagination): Promise<{ count: number; rows: UserResponseDTO[] }> {
        const {count, rows} = await UserModel.findAndCountAll({
            where: pagination.condition,
            order: pagination.order,
            offset: pagination.offset,
            limit: pagination.pageSize,
        });

        const sanitizedRows = rows.map(user => new UserResponseDTO(
            user.id,
            user.firstName,
            user.lastName,
            user.email
        ));

        return {count, rows: sanitizedRows};
    }

    async create(user: User): Promise<UserResponseDTO> {
        const createdUser = await UserModel.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        });

        return new UserResponseDTO(
            createdUser.id,
            createdUser.firstName,
            createdUser.lastName,
            createdUser.email,
        );
    }

    async findById(id: string): Promise<UserResponseDTO | null> {
        const user = await UserModel.findByPk(id);
        if (!user) return null;

        return new UserResponseDTO(user.id, user.firstName, user.lastName, user.email);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({where: {email}});
        if (!user) return null;

        return new User(user.id, user.firstName, user.lastName, user.email, user.password);
    }

    async update(id: string, data: Partial<User>): Promise<UserResponseDTO | null> {
        const updateData: Omit<Partial<User>, 'id'> = {...data};

        const [updated] = await UserModel.update(updateData, {where: {id}});

        if (updated) {
            const user = await UserModel.findByPk(id);
            if (user) {
                return new UserResponseDTO(user.id, user.firstName, user.lastName, user.email);
            }
        }

        return null;
    }

    async delete(id: string): Promise<void> {
        const user = await UserModel.findByPk(id);
        if (user) {
            await user.destroy();
        }
    }
}
