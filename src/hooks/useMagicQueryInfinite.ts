import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import  { useSWRInfinite } from "swr";
import { fetcher } from "../helper/fetcher";
import { QueryResult } from "../helper/QueryResult";
import { rxModelsSwrConfig } from "../rxModelsSwrConfig";

export function useMagicQueryInfinite<T>(getKey:(pageIndex: any, previousPageData: any)=>string|null, option?:any){
  const history = useHistory();
  const rtValue = useSWRInfinite<QueryResult<T[]>>(getKey, fetcher, {errorRetryCount:0, ...option});
  useEffect(()=>{
    if(rtValue?.error?.status === 401){
      history?.push(rxModelsSwrConfig.loginUrl);
    }
  },[rtValue.error, history, rtValue])
  const rtError = rtValue.error ? {message:rtValue.error?.message?.error} : undefined;
  return {...rtValue, error:rtError};
}