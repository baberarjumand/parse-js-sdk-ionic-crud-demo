import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configParams = {
    parseAppId: environment.parseAppId,
    parseMasterKey: environment.parseAppMasterKey,
    parseServerUrl: environment.parseLocalServerUrl,
  };

  constructor() {}
}
