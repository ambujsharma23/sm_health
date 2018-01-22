import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiUrlService } from './apiUrl.service';
import { LoginModel } from '../models/typings';

@Injectable()
export class AuthService {

    constructor(private http: Http, private apiUrlService: ApiUrlService) {}

    public login(loginModel: LoginModel): Observable<Response> {
        return this.http.post(this.apiUrlService.getLoginUrl(), loginModel).map((res: Response) => {
            return res;
        });
    }
}
