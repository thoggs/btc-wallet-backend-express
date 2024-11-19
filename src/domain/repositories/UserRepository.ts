import {User} from "../entities/User";
import {Pagination} from "../../shared/types/pagination";

export type UserRepository = {
    findAll(pagination: Pagination): Promise<{ count: number; rows: any[] }>;

    create(userData: Partial<User>): Promise<User>;

    findById(id: string): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    update(id: string, data: Partial<User>): Promise<User | null>;

    delete(id: string): Promise<void>;
}
