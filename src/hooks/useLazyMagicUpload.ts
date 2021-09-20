import { AxiosRequestConfig } from "axios";
import { API_MAGIC_UPLOAD } from "../helper/api";
import { DataError } from "../helper/DataError";
import { QueryOrPostOption } from "./QueryOrPostOption";
import { useLazyAxios } from "./useLazyAxios";

export function useLazyMagicUpload<T>(
    options?: QueryOrPostOption<T>      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLazyAxios<T>({
      ...API_MAGIC_UPLOAD, 
      headers:{
        ...(API_MAGIC_UPLOAD.headers || {}),
        "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
      }
    }, 
    options
  );
  return rtValue;
}