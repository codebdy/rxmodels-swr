import { AxiosRequestConfig } from "axios";
import { API_MAGIC_DELETE } from "../helper/api";
import { DataError } from "../helper/DataError";
import { useLayzyAxios } from "./useLayzyAxios";

export function useLayzyMagicDelete<T>(
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLayzyAxios(API_MAGIC_DELETE, options);
  return rtValue;
}