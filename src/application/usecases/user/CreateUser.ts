import {UserRepository} from "../../../domain/repositories/UserRepository";
import {User} from "../../../domain/entities/User";
import bcrypt from "bcryptjs";
import {UserResponseDTO} from "../../../shared/dto/UserResponseDTO";

export class CreateUser {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async execute(
        data: {
            firstName: string;
            lastName: string;
            email: string;
            password: string
        }
    ): Promise<UserResponseDTO> {

        const hashedPassword = data.password
            ? await bcrypt.hash(data.password, 10)
            : "";

        const user = new User(null, data.firstName, data.lastName, data.email, hashedPassword);

        return await this.userRepository.create(user);
    }
}
