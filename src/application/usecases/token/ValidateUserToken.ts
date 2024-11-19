import {UserRepository} from "../../../domain/repositories/UserRepository";
import {UserResponseDTO} from "../../../shared/dto/UserResponseDTO";

export class ValidateUserToken {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async execute(userId: string): Promise<UserResponseDTO | null> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            return null;
        }
        return user;
    }
}
