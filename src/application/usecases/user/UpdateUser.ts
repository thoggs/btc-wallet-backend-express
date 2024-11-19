import {UserRepository} from "../../../domain/repositories/UserRepository";
import {User} from "../../../domain/entities/User";
import bcrypt from "bcryptjs";
import {NotFoundError} from "../../../shared/errors/NotFoundError";
import {UpdateError} from "../../../shared/errors/UpdateError";

export class UpdateUser {
    constructor(private userRepository: UserRepository) {
    }

    async execute(id: string, data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError(`User with ID not found`);
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = await this.userRepository.update(id, data);

        if (!updatedUser) {
            throw new UpdateError(`Failed to update user with ID`);
        }

        return updatedUser;
    }
}
