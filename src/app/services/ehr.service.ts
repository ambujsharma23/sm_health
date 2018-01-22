import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EhrService {

    conceptSuggestionUrl = 'http://ehr.smarthealth.ai/concept-suggestions/';
    
    constructor(private http: Http){}

    public getTemplate(templateName): Observable<Response> {
        return this.http.get('http://localhost:3000/template').map((res: Response) => {
            return res;
        });
    }

    public getSmartSuggestions(input, type): Observable<Response> {
        let searchField: string;
        switch (type) {
            case 'pc':
                searchField = 'presenting_complaints';
                break;
            case 'ge':
                searchField = 'general_examinations';
                break;
            case 'fd':
                searchField = 'final_diagnosis';
                break;
            case 'pd':
                searchField = 'procedures';
                break;
        }
        return this.http.get('http://localhost:3000/smart/?i=' + input + '&f=' + searchField).map((res: Response) => {
            return res;
        },
        (error: Error) => {
            return error;
        });
    }

    public getFavoriteList(type): Observable<Response> {
        let input;
        let searchField;
        switch (type) {
            case 'pc':
                input = 'dia';
                searchField = 'presenting_complaints';
                break;
            case 'ge':
                input = 'dia';
                searchField = 'general_examinations';
                break;
            case 'fd':
                input = 'acl';
                searchField = 'final_diagnosis';
                break;
            case 'pd':
                input = 'bre';
                searchField = 'procedures';
                break;
        }
        return this.http.get('http://localhost:3000/smart/?i=' + input + '&f=' + searchField).map((res: Response) => {
            return res;
        },
        (error) => {
            return error;
        });
    }

    public saveData(formData): Observable<number> {
        return this.http.post('http://localhost:3000/save', formData).map((res: Response) => {
            return res.status;
        },
        (error: Error) => {
            return error;
        });
    }
}
