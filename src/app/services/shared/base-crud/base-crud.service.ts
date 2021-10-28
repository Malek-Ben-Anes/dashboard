import { EventEmitter, Injector, Injectable } from '@angular/core';
import { Request, RequestArgs } from './request.class';
import { PageResult } from './page-result.class';
import { CacheService } from './cache.service';
import { WebService } from '../web.service';
import { PageRequest } from './page-request.class';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

export class CrudSocketResponse {
  updateById: string;
  updateByMatricule: string;
  updateNomComplet: string;
  payload;
}


@Injectable({
  providedIn: 'root',
})
export abstract class BaseCrudService<T, U> {

  public postEntityEvent = new EventEmitter<U>();
  private entityUpdateEvents: EventEmitter<U>[] = [];
  /**
   * EXPERIMENTAL
   */
  public postEntitySocketEvent = new EventEmitter<CrudSocketResponse>();

  modelName = '';

  pageRequest: Subscription;

  protected webService: WebService;
  protected cacheService: CacheService;

  protected constructor(protected injector: Injector) {
    this.webService = injector.get(WebService);
    this.cacheService = injector.get(CacheService);
  }


  public findPage(path: string, pageReuqest: PageRequest, getParams = {}, singleRequest = true): Promise<PageResult<U>> {
    if (this.pageRequest) {
      this.pageRequest.unsubscribe();
    }
    return new Promise((done, reject) => {
      this.pageRequest = this.webService.postObservable<PageResult<U>>(path, pageReuqest.toGetParams(), getParams).subscribe(result => {
        done(result);
      }, error => reject(error));
    });
  }

  public async findAll(): Promise<U[]> {
    return this._finds(this.modelName);
  }

  protected async _find(uri: string, getParams: any = {}): Promise<U> {
    return await this.webService.get<U>(uri, getParams);
  }

  protected async _findWithArgs(uri: string, args: RequestArgs, getParams: any = {}): Promise<U> {
    return await this.webService.post<U>(uri, args, getParams);
  }

  protected async _finds(uri: string, args: any = {}): Promise<U[]> {
    return await this.webService.get<U[]>(uri, args);
  }

  public async findByIdWithArgs(id, args: RequestArgs, force = false) {

    // Si une requete est déja en cours
    let request = this.cacheService.get<Request<U>>(this.modelName + '.' + id + '.' + JSON.stringify(args));
    if (request && !force) {

      return cloneDeep(await request.promise);
    } else {
      // On fait la requete
      request = {
        id: id,
        promise: new Promise<U>(async (sendResolve, error) => {
          try {
            let value = await this._findWithArgs(this.modelName + '/' + id, args);
            sendResolve(value);
          } catch (e) {
            error(e);
          }
        })
      };
      this.cacheService.set(this.modelName + '.' + id + '.' + JSON.stringify(args), request);
      return cloneDeep(await request.promise);
    }
  }

  public async findById(id, force = false): Promise<U> {

    // Si une requete est déja en cours
    let request = this.cacheService.get<Request<U>>(this.modelName + '.' + id);
    if (request && !force) {
      return cloneDeep(await request.promise);
    } else {
      // On fait la requete
      request = {
        id: id,
        promise: new Promise<U>(async (sendResolve, error) => {
          try {
            let value = await this._find(this.modelName + '/' + id);
            sendResolve(value);
          } catch {
            error();
          }
        })
      };
      this.cacheService.set(this.modelName + '.' + id, request);
      return cloneDeep(await request.promise);
    }
  }

  public async postEntity(model: T|any): Promise<U> {
    let result = this.webService.post<U>(this.modelName, model);
    // update cache
    let entityResult = await result;

    // cache clear
    this.cacheService.clear();

    // notify modification
    if (!entityResult['id']) {
      throw Error('BaseCrudService : data must have an "id" field !');
    }
    this.emitUpdate(entityResult['id'], entityResult);

    return entityResult;
  }

  public async putEntity(model: T|any, id: string): Promise<U> {
    const result = this.webService.put<U>(this.modelName + '/' + id, model);

    // update cache
    let entityResult = await result;
    // this.cacheService.remove(this.modelName + '.' + id + '*');

    this.cacheService.clear();

    this.emitUpdate(id, entityResult);

    return entityResult;
  }

  public async remove(id: string) {
    await this.webService.delete(this.modelName + '/' + id);
    this.cacheService.clear();
    this.emitUpdate(id, null);
  }

  public emitUpdate(id: string, newValue: U) {
    if (!this.entityUpdateEvents[id]) {
      this.entityUpdateEvents[id] = new EventEmitter();
    }
    this.entityUpdateEvents[id].emit(newValue);
    // old system
    this.postEntityEvent.emit(newValue);
    // to do : auto update cache without clear it
  }

  subscribeEntity(id: string, callback: (p: U) => void): Subscription {
    if (!this.entityUpdateEvents[id]) {
      this.entityUpdateEvents[id] = new EventEmitter();
    }
    return this.entityUpdateEvents[id].subscribe(callback);
  }

}
