import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContentService {
    public hostUrl = environment.API_URI;
    private currentUserSubject: any;
    public currentUser: any;
    public userToken: any;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.userToken = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).jwt_token : null;
    }

    addContent(formData) {
        var headers = new HttpHeaders().set("Authorization", "Bearer " + this.userToken);
        return this.http.post<any>(this.hostUrl+`/content/add-content`, formData, {headers})
        .pipe(map(category => {
            return category;
        }));
    }

    getAllContent(category_id) {
        let user_id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user._id : null;
        let params = new HttpParams();

        // Begin assigning parameters   
        params = params.append('user_id', user_id);
        if(category_id) {
            params = params.append('category_id', category_id);
        }
        let headers = new HttpHeaders().set("Authorization", "Bearer " + this.userToken);
        return this.http.get<any>(this.hostUrl+`/content/get-content`, {headers, params} )
            .pipe(map(categories => {
                return categories;
            }));
    }

    getFilteredContent(category_id, text) {
        let user_id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user._id : null;
        let params = new HttpParams();

        // Begin assigning parameters   
        params = params.append('user_id', user_id);
        params = params.append('text', text);
        if(category_id) {
            params = params.append('category_id', category_id);
        }
        let headers = new HttpHeaders().set("Authorization", "Bearer " + this.userToken);
        return this.http.get<any>(this.hostUrl+`/content/get-filtered-content`, {headers, params} )
            .pipe(map(categories => {
                return categories;
            }));
    }

}