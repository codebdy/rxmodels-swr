export class MagicPostBuilder<T>{
  private _entity:string = '';
  private _datas:T[] = [];
  private _isSingle = false;
  private _directives: string[] = [];

  constructor(entity?:string){
    if(entity){
      this.setEntity(entity);      
    }
  }

  setEntity(entity:string){
    this._entity = entity;
    return this;
  }

  setSingleData(data:T){
    this._isSingle = true;
    this._datas = [data];
    return this;
  }

  addEntityDirective(directive:string){
    this._directives.push(`@${directive}`);
    return this;
  }

  setDatas(datas:T[]){
    this._datas = datas;
    return this;
  }
  
  addData(data:T){
    this._datas.push(data);
    return this;
  }
    
  toData(){
    return {
      [`${this._entity} ${this._directives.join(' ')}`]: this._isSingle ? this._datas[0] : this._datas
    };
  }
}