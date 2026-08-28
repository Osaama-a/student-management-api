import { type PaginationMeta } from "../types/common.types.js";

export function  parsePagination( query: { page?: string, limit?: string }) {
    const page = Math.max(Number(query.page)|| 1, 1);
    const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
    const offset = ( page - 1 ) * limit;
    return { page, limit, offset };
}

export function buildPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
    return {
        page,
        limit,
        total,
        totalPages: Math.max(Math.ceil(total / limit), 1),
    };
}