import { AxiosRequestConfig } from "axios";
import { API_MAGIC_POST } from "../helper/api";
import { DataError } from "../helper/DataError";
import { QueryOrPostOption } from "./QueryOrPostOption";
import { useLazyAxios } from "./useLazyAxios";

export function useLazyMagicPost<T>(
    options?: QueryOrPostOption<T>     
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLazyAxios({
    ...API_MAGIC_POST, 
    headers:{
      ...(API_MAGIC_POST.headers || {}),
      'Content-Type': 'application/json'
    }
  }, options);
  return rtValue;
}