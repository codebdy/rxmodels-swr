import { AxiosRequestConfig } from "axios";
import { API_MAGIC_DELETE } from "../helper/api";
import { DataError } from "../helper/DataError";
import { useLazyAxios } from "./useLazyAxios";

export function useLazyMagicDelete<T>(
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLazyAxios(API_MAGIC_DELETE, options);
  return rtValue;
}