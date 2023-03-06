import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // private _storage: Storage | null = null;

  constructor(private storage: Storage) {
  }
  public set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  public get(key:string){
    return this.storage?.get(key);
  }
}
