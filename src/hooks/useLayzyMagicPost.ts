import { AxiosRequestConfig } from "axios";
import { API_MAGIC_POST } from "../helper/api";
import { DataError } from "../helper/DataError";
import useLayzyAxios from "./useLayzyAxios";

export default function useLayzyMagicPost<T>(
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLayzyAxios(API_MAGIC_POST, options);
  return rtValue;
}