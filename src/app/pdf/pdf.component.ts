import { EditMode } from './../models/EditMode';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

/**
 * Component for displaying the PDF download button or the upload PFD component in the edit mode.
 */
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent extends EditMode implements OnInit {

    private applicationUrl = environment.backendUrl;
    pdfURI = `${ this.applicationUrl }/image/downloadFile/27`;

    pdfIcon = faFilePdf;

  constructor() {
      super();
  }

  ngOnInit(): void { }

}
