import {UserRepository} from "../../../domain/repositories/UserRepository";
import {User} from "../../../domain/entities/User";

export class ValidateUserToken {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async execute(userId: string): Promise<User | null> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            return null;
        }
        return user;
    }
}
