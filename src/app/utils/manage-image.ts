export class ManageImage {

    constructor(public fileData: File = null, public previewUrl: any = null, public formData = new FormData()) {}

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

}
