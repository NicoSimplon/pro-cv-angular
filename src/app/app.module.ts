import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { HttpClientModule } from '@angular/common/http';
import { IdentificationComponent } from './identification/identification.component';
import { FormationsComponent } from './formations/formations.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ProjectsComponent } from './projects/projects.component';
import { TechnosComponent } from './technos/technos.component';
import { SkillsComponent } from './skills/skills.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { XpComponent } from './experiences/xp/xp.component';
import { AddNewXpComponent } from './experiences/add-new-xp/add-new-xp.component';
import { DeleteXpComponent } from './experiences/delete-xp/delete-xp.component';
import { UpdateXpComponent } from './experiences/update-xp/update-xp.component';
import { HobbyComponent } from './hobbies/hobby/hobby.component';
import { AddHobbyComponent } from './hobbies/add-hobby/add-hobby.component';
import { UpdateHobbyComponent } from './hobbies/update-hobby/update-hobby.component';
import { DeleteHobbyComponent } from './hobbies/delete-hobby/delete-hobby.component';
import { FormationComponent } from './formations/formation/formation.component';
import { AddFormationComponent } from './formations/add-formation/add-formation.component';
import { UpdateFormationComponent } from './formations/update-formation/update-formation.component';
import { DeleteFormationComponent } from './formations/delete-formation/delete-formation.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    IdentificationComponent,
    FormationsComponent,
    HobbiesComponent,
    ExperiencesComponent,
    ProjectsComponent,
    TechnosComponent,
    SkillsComponent,
    LoginComponent,
    EditComponent,
    MenuComponent,
    AccountComponent,
    XpComponent,
    AddNewXpComponent,
    DeleteXpComponent,
    UpdateXpComponent,
    HobbyComponent,
    AddHobbyComponent,
    UpdateHobbyComponent,
    DeleteHobbyComponent,
    FormationComponent,
    AddFormationComponent,
    UpdateFormationComponent,
    DeleteFormationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
