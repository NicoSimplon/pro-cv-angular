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
import { ProjectComponent } from './projects/project/project.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { UpdateProjectComponent } from './projects/update-project/update-project.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { TechnoComponent } from './technos/techno/techno.component';
import { AddTechnoComponent } from './technos/add-techno/add-techno.component';
import { UpdateTechnoComponent } from './technos/update-techno/update-techno.component';
import { DeleteTechnoComponent } from './technos/delete-techno/delete-techno.component';
import { SkillGroupDisplayComponent } from './skills/skill-group-display/skill-group-display.component';
import { UpdateSkillGroupComponent } from './skills/update-skill-group/update-skill-group.component';
import { DeleteSkillGroupComponent } from './skills/delete-skill-group/delete-skill-group.component';
import { AddSkillGroupComponent } from './skills/add-skill-group/add-skill-group.component';
import { DisplayAdressComponent } from './identification/display-adress/display-adress.component';
import { UpdateAdressComponent } from './identification/update-adress/update-adress.component';
import { DisplayPhotoComponent } from './identification/display-photo/display-photo.component';
import { UpdatePhotoComponent } from './identification/update-photo/update-photo.component';
import { DisplayPhoneComponent } from './identification/display-phone/display-phone.component';
import { UpdatePhoneComponent } from './identification/update-phone/update-phone.component';
import { DisplayEmailComponent } from './identification/display-email/display-email.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FollowMeComponent } from './follow-me/follow-me.component';
import { PdfComponent } from './pdf/pdf.component';
import { UploadFileComponent } from './pdf/upload-file/upload-file.component';

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
    DeleteFormationComponent,
    ProjectComponent,
    AddProjectComponent,
    UpdateProjectComponent,
    DeleteProjectComponent,
    TechnoComponent,
    AddTechnoComponent,
    UpdateTechnoComponent,
    DeleteTechnoComponent,
    SkillGroupDisplayComponent,
    UpdateSkillGroupComponent,
    DeleteSkillGroupComponent,
    AddSkillGroupComponent,
    DisplayAdressComponent,
    UpdateAdressComponent,
    DisplayPhotoComponent,
    UpdatePhotoComponent,
    DisplayPhoneComponent,
    UpdatePhoneComponent,
    DisplayEmailComponent,
    FollowMeComponent,
    PdfComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
