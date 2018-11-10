import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";

import { AuthenticationComponent } from "./auth/authentication.component"
import { AuthService } from './auth/auth.service'
import { ErrorComponent } from "./errors/error.component"
import { ErrorService } from './errors/error.service'
import { HeaderComponent } from "./common/header.component"
import { MessageModule } from './messages/message.module'

import { routes } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
      BrowserModule,
      routes,
      HttpModule,
      MessageModule
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
