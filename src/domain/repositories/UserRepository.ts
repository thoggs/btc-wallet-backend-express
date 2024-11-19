import {User} from "../entities/User";
import {Pagination} from "../../shared/types/pagination";
import {UserResponseDTO} from "../../shared/dto/UserResponseDTO";

export type UserRepository = {
    findAll(pagination: Pagination): Promise<{ count: number; rows: any[] }>;

    create(userData: Partial<User>): Promise<UserResponseDTO>;

    findById(id: string): Promise<UserResponseDTO | null>;

    findByEmail(email: string): Promise<User | null>;

    update(id: string, data: Partial<User>): Promise<UserResponseDTO | null>;

    delete(id: string): Promise<void>;
}
