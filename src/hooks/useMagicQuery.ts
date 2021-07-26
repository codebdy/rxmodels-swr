import  { SWRConfiguration, SWRResponse } from "swr";
import { MagicQueryBuilder } from "../builders/MagicQueryBuilder";
import { DataError } from "../helper/DataError";
import { QueryResult } from "../helper/QueryResult";
import { QueryOrPostOption } from "./QueryOrPostOption";
import { useSWRQuery } from "./useSWRQuery";

export function useMagicQuery<T>(querybuilder?:MagicQueryBuilder, options?:SWRConfiguration&QueryOrPostOption<QueryResult<T>>):SWRResponse<QueryResult<T>, DataError>&{loading?:boolean}{

  const rt = useSWRQuery<QueryResult<T>>(querybuilder?.toAxioConfig(), options);

  return rt;
}