export interface PageResult<T> {
    content: T[];
    first: boolean;
    last: boolean;
    numberOfElements: number;
    size: number;
    totalPages: number;
    number: number;
    totalElements: number;
}
