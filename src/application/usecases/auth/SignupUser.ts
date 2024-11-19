import bcrypt from "bcryptjs";
import generateAccessToken from "../../../shared/utils/generateAccessToken";
import {User} from "../../../domain/entities/User";
import {UserRepository} from "../../../domain/repositories/UserRepository";

export class SignupUser {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async execute(data: Partial<User>): Promise<{ user: Omit<User, "password">; accessToken: string }> {

        const hashedPassword = data.password
            ? await bcrypt.hash(data.password, 10)
            : "";

        const user = await this.userRepository.create({
            ...data,
            password: hashedPassword,
        });

        const accessToken = generateAccessToken(user);

        const {...userWithoutPassword} = user;

        return {
            user: userWithoutPassword as Omit<User, "password">,
            accessToken,
        };
    }
}
