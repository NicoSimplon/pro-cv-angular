import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Photo } from '../models/Photo';
import { ModifiedUser } from '../models/ModifiedUser';
import { Adress } from '../models/Adress';
import { Formation } from '../models/Formation';
import { Hobby } from '../models/Hobby';
import { Skill } from '../models/Skill';
import { SkillGroup } from '../models/SkillGroup';
import { XpPro } from '../models/XpPro';
import { Project } from '../models/Project';
import { Techno } from '../models/Techno';
import { Phone } from '../models/Phone';
import { UserEmail } from '../models/UserEmail';
import { ImageDto } from '../models/ImageDto';

/**
 * Private services for admin exclusive use. With these services the admin can update the various datas of the CV (update, create, delete).
 */
@Injectable({
    providedIn: 'root',
})
export class PrivateServicesService {
    URL_BACKEND = `${environment.backendUrl}`;

    constructor(private _http: HttpClient) {}

    // Photo Service

    /**
     * Update the profile photo url persisted into the database.
     *
     * @param photo Photo object containing the photo path.
     */
    updatePhotoUrl(photo: Photo): Observable<Photo> {
        return this._http.patch<Photo>(`${this.URL_BACKEND}/photo/update`, photo, {withCredentials: true});
    }

    // Image Services

    /**
     * Upload a new image to be stored in the database.
     * In return we get the new image ID.
     *
     * @param image The image that has to be uploaded.
     */
    uploadImage(image: FormData): Observable<ImageDto> {
        return this._http.post<ImageDto>(`${this.URL_BACKEND}/image/uploadFile`, image, {withCredentials: true});
    }

    /**
     * Change the image associated with an ID.
     *
     * @param newImage the new image
     * @param imageId the id of the image that has to be modified
     */
    updateImage(newImage: FormData, imageId: number): any {
        return this._http.patch(`${this.URL_BACKEND}/image/update/${imageId}`, newImage, { withCredentials: true });
    }

    /**
     * Call the back API for deleting the image with the provided ID.
     *
     * @param imageId the ID od the image that has to be deleted.
     */
    deleteImage(imageId: number): Observable<string> {
        return this._http.delete<string>(`${this.URL_BACKEND}/image/delete/${imageId}`, {withCredentials: true});
    }

    // User Service

    /**
     * Update users logins data persisted into the database.
     *
     * @param user Oject representing an admin user. It is used to modify admin's email and/or password.
     */
    updateUserLogins(user: ModifiedUser): Observable<UserEmail> {
        return this._http.patch<UserEmail>(`${this.URL_BACKEND}/user/update`, user, { withCredentials: true });
    }

    // Phone Service

    /**
     * Update the phone number into the database
     *
     * @param newNumber Object that contain the new phone number
     */
    updatePhoneNumber(newNumber: Phone): Observable<Phone> {
        return this._http.patch<Phone>(`${this.URL_BACKEND}/phone/update`, newNumber, { withCredentials: true });
    }

    // Adress Service

    /**
     * Update differents part of the adress.
     *
     * @param newAdress Object representing all the adress parts.
     */
    updateAdress(newAdress: Adress): Observable<Adress> {
        return this._http.patch<Adress>(`${this.URL_BACKEND}/adress/update`, newAdress, { withCredentials: true });
    }

    // Formation Services

    /**
     * Create a new formation to be persisted.
     *
     * @param newFormation Object representing a formation or a grade.
     */
    createFormation(newFormation: Formation): Observable<string> {
        return this._http.post<string>(`${this.URL_BACKEND}/formations/add/1`, newFormation, { withCredentials: true });
    }

    /**
     * Update differents part of an existing formation.
     *
     * @param modifiedFormation Object representing a formation or a grade.
     */
    updateFormation(modifiedFormation: Formation): Observable<string> {
        return this._http.patch<string>(`${this.URL_BACKEND}/formations/update`, modifiedFormation, { withCredentials: true });
    }

    /**
     * Delete an existing formation.
     *
     * @param id Id of the formation that has to be deleted.
     */
    deleteFormation(id: number): Observable<string> {
        return this._http.delete<string>(`${this.URL_BACKEND}/formations/delete/${id}`, { withCredentials: true });
    }

    // Hobbies Services

    /**
     * Create a new hobby to be persisted.
     *
     * @param newHobby Object representing an hobby.
     */
    createHobby(newHobby: Hobby): Observable<string> {
        return this._http.post<string>(`${this.URL_BACKEND}/hobbies/add/1`, newHobby, { withCredentials: true });
    }

    /**
     * Update differents part of an existing hobby.
     *
     * @param modifiedHobby Object representing an hobby.
     */
    updateHobby(modifiedHobby: Hobby): Observable<string> {
        return this._http.patch<string>(`${this.URL_BACKEND}/hobbies/update`, modifiedHobby, { withCredentials: true });
    }

    /**
     * Delete an existing hobby.
     *
     * @param id Id of the hobby that has to be deleted.
     */
    deleteHobby(id: number): Observable<string> {
        return this._http.delete<string>(`${this.URL_BACKEND}/formations/delete/${id}`, { withCredentials: true });
    }

    // Skill Services

    /**
     * Create a new skill to be persisted and linked with a skill group.
     *
     * @param newHnewSkill Object representing a new skill.
     */
    createSkill(newHnewSkill: Skill, groupId: number): Observable<string> {
        return this._http.post<string>(`${this.URL_BACKEND}/skills/add-skill/${groupId}`, newHnewSkill, { withCredentials: true });
    }

    /**
     * This method is used to remove a single skill from a skill group.
     * Be aware the skill will be deleted from the database with this operation.
     *
     * @param skillId Id od the skill that have to be removed.
     */
    removeSkill(skillId: number): Observable<string> {
        return this._http.delete<string>(`${this.URL_BACKEND}/skills/delete-skill/${skillId}`, { withCredentials: true });
    }

    /**
     * Create a new skill group for persisting it.
     *
     * @param newGroup Object representing a new Skill group.
     */
    createSkillGroup(newGroup: SkillGroup): Observable<string> {
        return this._http.post<string>(`${this.URL_BACKEND}/skills/add-group/1`, newGroup, { withCredentials: true });
    }

    /**
     * This method is used to update a skill group datas and/or insides skills. Do not delete skills by this way.
     * For deleting a skill you have to use the remove method.
     *
     * @param modifiedSkillGroup An existing skill group with modified title or modified skills.
     */
    updateSkillGroup(modifiedSkillGroup: SkillGroup): Observable<string> {
        return this._http.patch<string>(`${this.URL_BACKEND}/skills/update`, modifiedSkillGroup, { withCredentials: true });
    }

    /**
     * This method is used to delete a skill group.
     * Be aware the skills inside this group will be deleted from the database with this operation.
     *
     * @param groupId Id od the skill that have to be removed.
     */
    deleteSkillGroup(groupId: number): Observable<string> {
        return this._http.delete<string>(`${this.URL_BACKEND}/skills/delete-group/${groupId}`, { withCredentials: true });
    }

    // Professional experience Services

    /**
     * Create a new experience to be persisted.
     *
     * @param newXpPro Object representing a new professional experience.
     */
    createXp(newXpPro: XpPro): Observable<string> {
        return this._http.post<string>(`${this.URL_BACKEND}/experiences/add/1`, newXpPro, { withCredentials: true });
    }

    /**
     * update an existing experience.
     *
     * @param modifiedXpPro Object representing a professional experience.
     */
    updateXp(modifiedXpPro: XpPro): Observable<string> {
        return this._http.patch<string>(`${this.URL_BACKEND}/experiences/update`, modifiedXpPro, { withCredentials: true });
    }

    /**
     * delete an existing experience.
     *
     * @param xpId Id of the experience that have to be removed.
     */
    deleteXp(xpId: number): Observable<string> {
        return this._http.delete<string>(`${this.URL_BACKEND}/experiences/delete/${xpId}`, { withCredentials: true });
    }

    // Project Services

    /**
     * Create a new project to be persisted.
     *
     * @param newProject Object representing a new project.
     */
    createProject(newProject: Project): Observable<string> {
        return this._http.post<string>(`${this.URL_BACKEND}/projets/add/1`, newProject, { withCredentials: true });
    }

    /**
     * update an existing project.
     *
     * @param modifiedProject Object representing a project.
     */
    updateProject(modifiedProject: Project): Observable<string> {
        return this._http.patch<string>(`${this.URL_BACKEND}/projects/update`, modifiedProject, { withCredentials: true });
    }

    /**
     * delete an existing project.
     *
     * @param projectId Id of the project that have to be removed.
     */
    deleteProject(projectId: number): Observable<string> {
        return this._http.delete<string>(`${this.URL_BACKEND}/projects/delete/${projectId}`, { withCredentials: true });
    }

    // Techno Services

    /**
     * Create a new Techno to be persisted.
     *
     * @param newTechno Object representing a new techno.
     */
    createTechno(newTechno: Techno): Observable<Techno> {
        return this._http.post<Techno>(`${this.URL_BACKEND}/technos/add/1`, newTechno, { withCredentials: true });
    }

    /**
     * update an existing techno.
     *
     * @param modifiedTechno Object representing a techno.
     */
    updateTechno(modifiedTechno: Techno): Observable<Techno> {
        return this._http.patch<Techno>(`${this.URL_BACKEND}/technos/update`, modifiedTechno, { withCredentials: true });
    }

    /**
     * delete an existing techno.
     *
     * @param technoId Id of the techno that have to be removed.
     */
    deleteTechno(technoId: number): any {
        return this._http.delete(`${this.URL_BACKEND}/technos/delete/${technoId}`, { withCredentials: true });
    }

}
