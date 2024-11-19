import {UserRepository} from "../../../domain/repositories/UserRepository";
import {NotFoundError} from "../../../shared/errors/NotFoundError";

export class DeleteUser {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError(`User with ID not found`);
        }

        await this.userRepository.delete(id);
    }
}
