import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Techno } from '../models/Techno';
import { EditMode } from '../models/EditMode';
import { PrivateServicesService } from '../services/private-services.service';
import { environment } from 'src/environments/environment';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Display the logos of the various technos used in both personnal and professionnal projects.
 */
@Component({
    selector: 'app-technos',
    templateUrl: './technos.component.html',
    styleUrls: ['./technos.component.css']
})
export class TechnosComponent extends EditMode implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    // Variables necessary to display or modify technos
    basicUrl = `${environment.backendUrl}`;
    newTechno = new Techno('', '', 2);
    technos: Techno[];
    fileData: File = null;
    previewUrl: any = null;
    formData = new FormData();

    constructor(private service: PublicServicesService, private privService: PrivateServicesService) {
        super();
    }

    /**
     * Display upload progress
     *
     */
    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
        this.preview();
    }

    /**
     * Display the new image preview
     */
    preview() {
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
        };
    }

    /**
     * Create a new techno and associate it
     * with the new image (logo) that has been provided.
     */
    addNewTechno(): void {
        this.formData.append('file', this.fileData);
        this.privService.uploadImage(this.formData).pipe(this._scavenger.collect()).subscribe(
            (image) => {
                const newLogo = this.newTechno;
                newLogo.imageId = image.id;
                newLogo.logoPath = `/image/downloadFile/${newLogo.imageId}`;
                this.privService.createTechno(newLogo).pipe(this._scavenger.collect()).subscribe(
                    (techno) => {
                        this.previewUrl = null;
                        this.fileData = null;
                        this.formData = new FormData();
                        this.technos.push(techno);
                        this.technos.sort((a, b) => (a.order - b.order));
                        this.sucessMessage = 'La nouvelle techno a été créée avec succès.';
                    },
                    () => {
                        this.errorMessage = 'Une erreur est survenue durant la création de la nouvelle techno.';
                        setInterval(() => {
                            this.errorMessage = undefined;
                        }, 7000);
                    }
                );
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant l\'upload du nouveau logo.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Update a techno logo path.
     *
     * @param modifiedTechno techno that has to be updated
     */
    updateLogoPath(modifiedTechno: Techno): void {
        this.privService.updateTechno(modifiedTechno).pipe(this._scavenger.collect()).subscribe(
            (techno) => {
                this.technos.filter(t => t.id === techno.id).map(t => t = techno);
                this.technos.sort((a, b) => (a.order - b.order));
                this.sucessMessage = `La techno ${techno.title} a été mise à jour avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant la modification de la techno.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Delete a techno and his logo.
     *
     * @param techToDelete techno that will be deleted
     */
    deleteTechno(techToDelete: Techno): void {
        this.privService.deleteTechno(techToDelete.id).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.privService.deleteImage(techToDelete.imageId).pipe(this._scavenger.collect()).subscribe(
                    () => {
                        this.sucessMessage = `La techno ${techToDelete.title} a bien été supprimée.`;
                        setInterval(() => {
                            this.sucessMessage = undefined;
                        }, 7000);
                        this.getTechnos();
                    },
                    () => {
                        this.errorMessage = 'Une erreur est survenue durant la suppression du logo.';
                        setInterval(() => {
                            this.errorMessage = undefined;
                        }, 7000);
                    }
                );
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant la suppression de la techno.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Update the logo of a techno.
     *
     * @param tech techno object for retrieving the id of the image to change
     */
    updateImage(tech: Techno): void {
        this.formData.append('file', this.fileData);
        this.privService.updateImage(this.formData, tech.imageId).pipe(this._scavenger.collect()).subscribe(
            () => {
                location.reload();
                this.sucessMessage = 'La photo de profil a été modifiée avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant la modification du logo.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );

    }

    /**
     * Get the complete list of technos stored
     * into the database
     */
    getTechnos(): void {
        this.service.getTechnos().pipe(this._scavenger.collect()).subscribe(
            technoList => {
                this.technos = technoList;
                this.technos.sort((a, b) => (a.order - b.order));
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant la récupération de la liste des technos.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        this.getTechnos();
    }

    ngOnDestroy(): void {
    }

}
