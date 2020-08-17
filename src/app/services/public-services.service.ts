import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IdentificationDatas } from '../models/IdenthificationDatas';
import { Adress } from '../models/Adress';
import { Formation } from '../models/Formation';
import { Hobby } from '../models/Hobby';
import { XpPro } from '../models/XpPro';
import { Project } from '../models/Project';
import { SkillGroup } from '../models/SkillGroup';
import { Techno } from '../models/Techno';
import { EmailMessage } from '../models/EmailMessage';

/**
 * Public services for getting CV datas to display for the visitor.
 */
@Injectable({
  providedIn: 'root'
})
export class PublicServicesService {

    URL_BACKEND = `${environment.backendUrl}`;

    constructor(private _http: HttpClient) { }

    /**
     * Get basic profile datas
     */
    getBasicDatas(): Observable<IdentificationDatas> {
        return this._http.get<IdentificationDatas>(`${this.URL_BACKEND}/user/cv/1`, { withCredentials: true });
    }

    /**
     * Get the current adress
     */
    getAdress(): Observable<Adress> {
        return this._http.get<Adress>(`${this.URL_BACKEND}/adress/cv/1`, { withCredentials: true });
    }

    /**
     * Get the current list of formations
     */
    getFormations(): Observable<Formation[]> {
        return this._http.get<Formation[]>(`${this.URL_BACKEND}/formations/cv/1`, { withCredentials: true });
    }

    /**
     * Get the current list of hobbies
     */
    getHobby(): Observable<Hobby[]> {
        return this._http.get<Hobby[]>(`${this.URL_BACKEND}/hobbies/cv/1`, { withCredentials: true });
    }

    /**
     * Get the current list of professional experiences
     */
    getXpPro(): Observable<XpPro[]> {
        return this._http.get<XpPro[]>(`${this.URL_BACKEND}/experiences/cv/1`, { withCredentials: true });
    }

    /**
     * Get the current list of project that i have benn involved in.
     */
    getProject(): Observable<Project[]> {
        return this._http.get<Project[]>(`${this.URL_BACKEND}/projects/cv/1`, { withCredentials: true });
    }

    /**
     * Get the current list of skills (a list of group of skills).
     */
    getSkills(): Observable<SkillGroup[]> {
        return this._http.get<SkillGroup[]>(`${this.URL_BACKEND}/skills/cv/1`, { withCredentials: true });
    }

    /**
     * Get the current list of technos (programming languages and framework) that i used.
     */
    getTechnos(): Observable<Techno[]> {
        return this._http.get<Techno[]>(`${this.URL_BACKEND}/technos/cv/1`, { withCredentials: true });
    }

    /**
     * Post to the back part of the application the mail from the visitor.
     * The mail will be sent by the back part of the application to my personal email box.
     *
     * @param mail Object that contains the message from the visitor and his email address.
     */
    sendEmail(mail: EmailMessage): Observable<EmailMessage> {
        return this._http.post<EmailMessage>(`${this.URL_BACKEND}/mail`, mail, { withCredentials: true });
    }

}
