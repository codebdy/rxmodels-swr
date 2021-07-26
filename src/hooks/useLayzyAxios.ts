import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosConfig } from "../helper/axiosConfig";
import { DataError } from "../helper/DataError";
import { trimServerUrl } from "../helper/trimServerUrl";
import { rxModelsSwrConfig } from '../rxModelsSwrConfig';
import { QueryOrPostOption } from "./QueryOrPostOption";

export function useLayzyAxios<T>(
    config?:AxiosRequestConfig, 
    options?: QueryOrPostOption<T>     
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  const localToken = rxModelsSwrConfig.token || localStorage.getItem(rxModelsSwrConfig.tokenName);
  const history = useHistory();

  axios.defaults.baseURL =  trimServerUrl(rxModelsSwrConfig.serverUrl);
  
  const excute = (config2?:AxiosRequestConfig)=>{    
    if(config2 || config){
      setLoading(true);
      axiosConfig.headers.authorization = localToken ? `Bearer ${localToken}` : "";
      //合并headers
      if(config2?.headers || config?.headers){
        axiosConfig.headers = {...axiosConfig.headers, ...config?.headers, ...config2?.headers};
        config2?.headers && delete config2?.headers;
        config?.headers && delete config?.headers;
      }
      axios( {...axiosConfig, ...config, ...config2} ).then(res => {
        setData(res.data);
        setLoading(false);
        if(options?.onCompleted){
          options?.onCompleted(res.data as any);
        }        
      })
      .catch(error => {
        console.log('Server error:useLayzyAxios', error.message);
        setLoading(false);
        const dataError = {
          message: error.response?.data?.error || error.message, 
          status: error.response?.data?.message
        }
        setError(dataError);
        if(options?.onError){
          options?.onError(dataError);
        }
        if(error.response?.status === 401){
          history?.push(rxModelsSwrConfig.loginUrl);
        }   
      })       
    }

  }
  return [excute, {loading, data, error}];
}