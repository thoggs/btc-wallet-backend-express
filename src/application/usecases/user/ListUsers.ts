import {UserRepository} from "../../../domain/repositories/UserRepository";
import {Pagination} from "../../../shared/types/pagination";

export class ListUsers {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async execute(pagination: Pagination) {
        const {count, rows} = await this.userRepository.findAll(pagination);

        const usersWithoutPassword = rows.map((user) => {
            delete user.password;
            return user;
        });

        return {
            data: usersWithoutPassword,
            pagination: {
                currentPage: pagination.page,
                totalPages: Math.ceil(count / pagination.pageSize),
                totalItems: count,
                itemsPerPage: pagination.pageSize,
                links: {
                    first: `/users?page=1&pageSize=${pagination.pageSize}`,
                    last: `/users?page=${Math.ceil(count / pagination.pageSize)}&pageSize=${pagination.pageSize}`,
                    prev:
                        pagination.page > 1
                            ? `/users?page=${pagination.page - 1}&pageSize=${pagination.pageSize}`
                            : null,
                    next:
                        pagination.page < Math.ceil(count / pagination.pageSize)
                            ? `/users?page=${pagination.page + 1}&pageSize=${pagination.pageSize}`
                            : null,
                },
            },
        };
    }
}
