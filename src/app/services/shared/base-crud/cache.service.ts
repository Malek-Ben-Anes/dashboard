import { Injectable } from '@angular/core';
import { CacheValue } from './cache-value';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  protected cacheValues: CacheValue<any>[] = [];

  public clear() {
    this.cacheValues = [];
  }
  /**
   * Remove an entry from the cache
   * @param key end with a * to delete all related to the key
   * sample : aircraft.*
   */
  public remove(key: string) {
    let toRemove: string[] = [];
    // wildcard
    if (key.substr(-1, 1) === '*') {
      key = key.substr(0, key.length - 2);
      toRemove = this.cacheValues.filter(e => e.key.substr(0, key.length) === key).map(e => e.key);
    } else {
      if (!this.cacheValues.find(e => e.key === key)) {
        console.warn('Cache value to remove not found : ', key);
      }
      toRemove = [key];
    }

    // Remove all values
    this.cacheValues = this.cacheValues.filter(e => !toRemove.find(b => b === e.key));
  }

  /** 
   * Put a value into the cache
   * @param key
   * @param value
   * @param expire default 120
   */
  public set<T>(key: string, value: T, expire = 5000): void {
    value = value;
    const expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + expire);
    this.cacheValues.push(new CacheValue<T>(
      key, value, expireDate
    ));
  }

  /**
   * Get a value from the cache, null if not found
   * @param key
   */
  public get<T>(key: string): T {
    const now = new Date();
    this.cacheValues = this.cacheValues.filter(e => e.expire > now);

    const result = this.cacheValues.find(e => {
      return e.key === key;
    });
    if (result) {
      return result.value;
    }
    return null;
  }

}
