import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private OAuth: AuthService,  
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/app/profile']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required])
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe((data) => {
        this.router.navigate(['/app/profile']);
      }, (error) => {
        this.loading = false;
      });
  }

  socialSignIn(socialProvider: string) {  
      let socialPlatformProvider;  
      if (socialProvider === 'facebook') {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
      } else if (socialProvider === 'google') {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
      }  
  
      this.OAuth.signIn(socialPlatformProvider).then((socialusers: any) => {
        if(socialusers) {
          socialusers['firstName'] = socialusers.name.split(' ').slice(0, -1).join(' ');
          socialusers['lastName'] = socialusers.name.split(' ').slice(-1).join(' ');
          this.authenticationService.socialLogin(socialusers).pipe(first()).subscribe((data) => {
            this.router.navigate(['/app/profile']);
          }, (error) => {
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
        
      });  
    }

}
