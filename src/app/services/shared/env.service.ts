import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private serverurl = '';
  private socketurl = '';


  getServerUrl() {
    return this.serverurl;
  }

  getSocketUrl() {
    return this.socketurl;
  }

  constructor() {
  }

  public init(env: {
    serversRedirectChildneo,
    pathrest: string,
    port: number,
    protocol: string,
    wsPort: number,
    ws: string
  }) {
    let hostname = document.location.hostname;
    // swap hostname if config ask for it
    if (env.serversRedirectChildneo) {
      if (env.serversRedirectChildneo[hostname]) {
        hostname = env.serversRedirectChildneo[hostname];
      }
    }
    // hostname: "sma3588";port : 8082  To change if we don't have back on
    this.serverurl = env.protocol + '://' + hostname + ':' + env.port + '/' + env.pathrest;
    this.socketurl = (env.protocol == 'http' ? 'ws' : 'wss')  + '://' + hostname + ':' + env.wsPort + '/' + env.pathrest + env.ws;
  }
}
