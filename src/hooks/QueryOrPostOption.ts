import { DataError } from "..";

export interface QueryOrPostOption<T>{
  onCompleted?:(data:T)=>void,
  onError?:(error:DataError)=>void,
}