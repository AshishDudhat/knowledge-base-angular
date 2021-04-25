import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { environment } from '../environments/environment';

let config = new AuthServiceConfig(  
  [  
    {  
      id: FacebookLoginProvider.PROVIDER_ID,  
      provider: new FacebookLoginProvider(environment.facebookKey)  
    },  
    {  
      id: GoogleLoginProvider.PROVIDER_ID,  
      provider: new GoogleLoginProvider(environment.googleKey)  
    }  
  ]);  
  export function getAuthServiceConfigs() {  
    return config;  
  }  
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{  
    provide: AuthServiceConfig,  
    useFactory: getAuthServiceConfigs  
  },
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
