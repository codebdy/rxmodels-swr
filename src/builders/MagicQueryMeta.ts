export const TOKEN_ENTITY = 'entity';

export class MagicQueryMeta{
  private _queryJSON:any;
  private _entity = '';
  private _directives:string[] = [];
  private _otherJSON = {} as any;

  constructor(query:string){
    try {
    this._queryJSON = JSON.parse(query);
    }
    catch(error){
      console.error(query, error);
    }
    if(!this._queryJSON){
      return;
    }
    for(const key in this._queryJSON){
      const keyStringArray = key.split('@');
      if(keyStringArray[0].trim().toLowerCase() === TOKEN_ENTITY){
        this._entity = this._queryJSON[key];
        this._directives = keyStringArray.slice(1).map(command => '@' + command);
      }
      else{
        this._otherJSON[key] = this._queryJSON[key];
      }
    }
  }

  addCondition(key:string, value:any){
    this._otherJSON[key] = value;
  }

  get entity(){
    return this._entity;
  }

  get directives():string[]{
    return this._directives;
  }

  get otherJSON(){
    return this._otherJSON;
  }

}