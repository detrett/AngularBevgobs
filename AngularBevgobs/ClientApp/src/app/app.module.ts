import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ForumComponent } from './forum/forum.component';
import { SubforumComponent } from './subforum/subforum.component';
import { SubforumContainerComponent } from './subforum/subforum-container.component';
import { ThreadComponent } from './thread/thread.component';
import { ThreadContainerComponent } from './thread/thread-container.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from "./user-settings/user-settings.component";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ForumComponent,
    SubforumComponent,
    SubforumContainerComponent,
    ThreadComponent,
    ThreadContainerComponent,
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent,
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
