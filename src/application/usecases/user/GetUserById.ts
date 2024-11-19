import {UserRepository} from "../../../domain/repositories/UserRepository";
import {User} from "../../../domain/entities/User";
import {NotFoundError} from "../../../shared/errors/NotFoundError";

export class GetUserById {
    constructor(private userRepository: UserRepository) {
    }

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundError(`User with ID not found`);
        }

        return user;
    }
}
