import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angular-6-social-login';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@ViewChild('confirmTemplate') confirmTemplate: ElementRef;
	public showHeader:boolean = false;
	public query:string = '';
	public confirmModal:any;
	public errorMsg:any;
	public userInfo:any = {};

  	constructor(
  		public router: Router,
		public authenticationService: AuthenticationService,
		public OAuth: AuthService
  	) {

  	}

  	ngOnInit() {
  	}

	logout(){
		let currentUserValue: any = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
		if(currentUserValue && currentUserValue.user.type !== "local") {
            this.OAuth.signOut().then(data => {
                this.router.navigate(['/auth/login']);  
            });
        }
		this.authenticationService.logout();
		this.router.navigate(['/auth/login'])
	}


}
