import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashHomeComponent } from './components/dash-home/dash-home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { CharactersComponent } from './components/characters/characters.component';
import { AboutComponent } from './components/about/about.component';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';
import { RequestsComponent } from './components/requests/requests.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';
import { SingleEpisodeComponent } from './components/single-episode/single-episode.component';
import { SingleCharacterComponent } from './components/single-character/single-character.component';


const routes: Routes = [
  {path:"",component:DashHomeComponent,
  children:[{path:"",component:LoginComponent},
            {path:"signup",component:SignupComponent}]
  },
  {path:"episodes",component:EpisodesComponent},
  {path:"characters",component:CharactersComponent},
  {path:"admin",component:AddEpisodeComponent,children:[
             {
              //for reuse for edit episode 
               path:':type',
               component:AddEpisodeComponent
             }
           ]},
  {path:"requests",component:RequestsComponent},
  {path:"add-character",component:AddCharacterComponent,children:[
             {
              //for reuse for edit character 
               path:':type',
               component:AddCharacterComponent
             }
           ]},
  {path:"about",component:AboutComponent},
  {path:"episode",component:SingleEpisodeComponent,children:[
             {
               path:':type',
               component:SingleEpisodeComponent
             }
           ]},
  {path:"character",component:SingleCharacterComponent,children:[
             {
               path:':type',
               component:SingleCharacterComponent
             }
           ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
