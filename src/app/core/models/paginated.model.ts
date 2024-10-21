// Pagina elemntos de tipo T
export interface Paginated<T>{
    data:T[];
    page:number;
    pages:number;
    pageSize:number;
}
