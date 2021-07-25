import { Paginator } from "./Paginator";

export interface QueryResult<T>{
  data:T;
  pagination?:Paginator;
}