export interface RxModelsSwrConfig {
  serverUrl: string;
  loginUrl: string,
  tokenName: string,
  token: string,
}

export interface SwrModelConfigInput{
  serverUrl?: string;
  loginUrl?: string,
  tokenName?: string,
  token?: string,
}

export const rxModelsSwrConfig: RxModelsSwrConfig = {
  serverUrl: 'http://localhost:3001/',
  loginUrl: '/login',
  tokenName: 'RxModelsToken',
  token: '',
}

export function initRxModelsSwr(config:SwrModelConfigInput){
  for(const key in config){
    const value = (config as any)[key];
    if( value !== undefined){
      (rxModelsSwrConfig as any)[key] = value;
    }
  }

  return rxModelsSwrConfig;
}
