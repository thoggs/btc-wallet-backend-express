import bcrypt from "bcryptjs";
import {UserRepository} from "../../../domain/repositories/UserRepository";
import {User} from "../../../domain/entities/User";
import generateAccessToken from "../../../shared/utils/generateAccessToken";
import {UnauthorizedError} from "../../../shared/errors/UnauthorizedError";
import {CustomValidationError} from "../../../shared/errors/CustomValidationError";

export class SigninUser {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async execute(email: string, password: string): Promise<{ user: Omit<User, "password">; accessToken: string }> {
        const validationErrors: { field: string; message: string }[] = [];

        if (!email) {
            validationErrors.push({field: 'email', message: 'Email is required.'});
        }

        if (!password) {
            validationErrors.push({field: 'password', message: 'Password is required.'});
        }

        if (validationErrors.length > 0) {
            throw new CustomValidationError(validationErrors);
        }

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const accessToken = generateAccessToken(user);
        const {password: _, ...userWithoutPassword} = user;

        return {
            user: userWithoutPassword as Omit<User, "password">,
            accessToken,
        };
    }
}
