import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { cache } from 'swr';
import { fetcher } from "../helper/fetcher";
import { rxModelsSwrConfig } from "../rxModelsSwrConfig";
import { QueryOrPostOption } from "./QueryOrPostOption";

export function useSWRQuery<T>(api?:AxiosRequestConfig, options?:SWRConfiguration&QueryOrPostOption<T>):SWRResponse<T, any>&{loading?:boolean}{
  const history = useHistory();
  const {onError, ...otherOptions} = options||{};
  const rtValue = useSWR<T>(api?.url||null, fetcher, {
      errorRetryCount:0, 
      revalidateOnFocus: false,
      ...(otherOptions||{})
    }
  );
  useEffect(()=>{
    if(rtValue?.error?.status === 401){
      localStorage.removeItem(rxModelsSwrConfig.tokenName);
      rxModelsSwrConfig.token = '';
      cache.clear();
      history?.push(rxModelsSwrConfig.loginUrl);
    }
    else if(rtValue?.error && onError){
      onError(rtValue?.error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rtValue])
  let rtError = rtValue.error ? {message:rtValue.error?.message?.error || rtValue.error?.message?.message || rtValue.error?.message, status: rtValue?.error?.status} : undefined;
  
  //如果是401错误，直接跳转，不需要提示
  if(rtValue?.error?.status === 401){
    rtError = undefined;
  }
  return {...rtValue, loading: !rtValue.data && !rtValue.error && !!api?.url, error:rtError};
}