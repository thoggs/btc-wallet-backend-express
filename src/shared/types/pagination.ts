export type Pagination = {
    page: number,
    pageSize: number,
    offset: number,
    condition: any,
    order: [string, 'ASC' | 'DESC'][]
}