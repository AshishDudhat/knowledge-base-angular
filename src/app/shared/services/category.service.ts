import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    public hostUrl = environment.API_URI;
    private currentUserSubject: any;
    public currentUser: any;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    addCategory(category_name) {
        let user_id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user._id : null;
        return this.http.post<any>(this.hostUrl+`/category/add-category`, { category_name, user_id })
            .pipe(map(category => {
                return category;
            }));
    }

    getAllCategory() {
        let user_id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user._id : null;
        let params = new HttpParams();

        // Begin assigning parameters   
        params = params.append('user_id', user_id);
        return this.http.get<any>(this.hostUrl+`/category/get-all-categories`, {params: params} )
            .pipe(map(categories => {
                return categories;
            }));
    }

}