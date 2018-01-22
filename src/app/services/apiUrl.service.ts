import { Injectable } from '@angular/core';
import { SERVER_BASE_URL, SERVER_API_URL } from '../../environments/environment';

@Injectable()
export class ApiUrlService {

    constructor() {}

    public getLoginUrl(): string {
        console.log(`${SERVER_API_URL}`);
        return 'http://localhost:3000/login';
    }

    public getBranchUrl(): string {
        return 'http://localhost:3000/branch';
    }
}
