import  { SWRResponse } from "swr";
import { MagicQueryBuilder } from "../builders/MagicQueryBuilder";
import { DataError } from "../helper/DataError";
import { QueryResult } from "../helper/QueryResult";
import { useSWRQuery } from "./useSWRQuery";

export function useMagicQuery<T>(queryMeta?:MagicQueryBuilder, options?:any):SWRResponse<QueryResult<T>, DataError>&{loading?:boolean}{

  const rt = useSWRQuery<QueryResult<T>>(queryMeta?.toAxioConfig(), options);

  return rt;
}