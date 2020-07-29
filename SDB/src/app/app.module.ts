import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { AuthService } from './service/auth.service';
import { EpisodeService } from './service/episode.service';
import { CharacterService } from './service/character.service';
import { TokenInterceptorService } from './service/token-interceptor.service';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashHomeComponent } from './components/dash-home/dash-home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { CharactersComponent } from './components/characters/characters.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';
import { RequestsComponent } from './components/requests/requests.component';
import { SingleEpisodeComponent } from './components/single-episode/single-episode.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SingleCharacterComponent } from './components/single-character/single-character.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    FooterComponent,
    DashHomeComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    EpisodesComponent,
    CharactersComponent,
    AddCharacterComponent,
    AddEpisodeComponent,
    RequestsComponent,
    SingleEpisodeComponent,
    CommentsComponent,
    SingleCharacterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EpisodeService,AuthService,CharacterService,
      {
        provide:HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi:true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
