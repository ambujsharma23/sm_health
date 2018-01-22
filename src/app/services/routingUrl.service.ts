import { Injectable } from '@angular/core';

@Injectable()
export class RoutingUrlService {

    private _BASE_URL = '/';
    private _LOGIN_URL = '/login';
    private _BRANCH_URL = '/branch';
    private _EHR_URL = '/ehr';

    public getBaseUrl() {
        return this._BASE_URL;
    }

    public getLoginUrl() {
        return this._LOGIN_URL;
    }

    public getBranchUrl() {
        return this._BRANCH_URL;
    }

    public getEhrUrl() {
        return this._EHR_URL;
    }

}
