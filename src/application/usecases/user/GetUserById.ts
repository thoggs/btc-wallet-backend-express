import {UserRepository} from "../../../domain/repositories/UserRepository";
import {User} from "../../../domain/entities/User";
import {NotFoundError} from "../../../shared/errors/NotFoundError";
import {UserResponseDTO} from "../../../shared/dto/UserResponseDTO";

export class GetUserById {
    constructor(private userRepository: UserRepository) {
    }

    async execute(id: string): Promise<UserResponseDTO> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundError(`User with ID not found`);
        }

        return user;
    }
}
