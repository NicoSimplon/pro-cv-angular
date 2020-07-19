import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    SkillsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
