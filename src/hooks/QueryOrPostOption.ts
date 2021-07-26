export interface QueryOrPostOption<T>{
  onCompleted?:(data:T)=>void,
  onError?:(error:any)=>void,
}