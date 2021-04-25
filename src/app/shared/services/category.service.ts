import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    public hostUrl = environment.API_URI;
    private currentUserSubject: any;
    public currentUser: any;
    public userToken: any;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.userToken = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).jwt_token : null;
    }

    addCategory(category_name) {
        let user_id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user._id : null;
        let headers = new HttpHeaders().set("Authorization", "Bearer " + this.userToken);
        return this.http.post<any>(this.hostUrl+`/category/add-category`, { category_name, user_id }, {headers})
            .pipe(map(category => {
                return category;
            }));
    }

    getAllCategory() {
        let user_id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user._id : null;
        let params = new HttpParams();

        // Begin assigning parameters   
        params = params.append('user_id', user_id);
        let headers = new HttpHeaders().set("Authorization", "Bearer " + this.userToken);
        return this.http.get<any>(this.hostUrl+`/category/get-all-categories`, {headers: headers, params: params} )
            .pipe(map(categories => {
                return categories;
            }));
    }

}