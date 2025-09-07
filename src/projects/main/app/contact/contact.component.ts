import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { success, error,successcontact,errorcontact } from '../../app/alertbox/alert';
import { PrivacypolicyComponent } from "../privacypolicy/privacypolicy/privacypolicy.component";
import { environment } from '../../../../assets/environment';
declare var Dropzone: any;
declare var $: any;
@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, PrivacypolicyComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  environment = environment;
  dropzoneInstance:any;
  private locomotiveScroll: any;

  DROPZONE__PREVIEW_TEMPLATE:any = `<div class="dz-preview dz-file-preview">
  <div class="dz-details">
      <div class="dz-thumbnail">
        <img data-dz-thumbnail>
        <span class="dz-nopreview">No preview</span>
        <div class="dz-success-mark"></div>
        <div class="dz-error-mark"></div>
          <div class="dz-error-message"><span data-dz-errormessage></span></div>
        <div class="progress">
          <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
        </div>
            </div>
          <div class="dz-filename" data-dz-name></div>
        <div class="dz-size" data-dz-size></div>
      </div>
      </div>`;

  contactForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,private fb: FormBuilder, private http: HttpClient){
    this.contactForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      companyNameorWebsite: ['', Validators.required],
      projectBrief: ['', Validators.required],
      projectQueries: ['',Validators.required],
      heardAboutUs: ['', Validators.required],
    });
    }

  navigateTo(ind:any){
    this.router.navigate(['/'+ind])
  }
  bannerfile:any=[];

  ngAfterViewInit(): void {
    this.dropzoneInstance = new Dropzone("#dropzone-banner", {
      url: "/",
      paramName: "file12",
      previewTemplate: this.DROPZONE__PREVIEW_TEMPLATE,
      acceptedFiles: ".jpeg,.jpg,.png,.pdf,.xls,.xlsx,.txt,.docx",
      maxFiles: 4,
      maxFilesize: 1, // MB
      addRemoveLinks: true,
      accept: function (file: any, done: any) {
        done();
      },
      success: (file: any, response: any) => {
        const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        file.customId = uniqueId;
        this.convertFileToBase64(file).then(base64 => {
          this.bannerfile.push({id: uniqueId, file: base64,fileName:file.name,fileType:file.type});
        });
        console.log(this.bannerfile)
      }, removedfile: (file: any) => {
        file.previewElement.remove();
        this.bannerfile = this.bannerfile.filter((f:any) => f.id !== file.customId);
      }, bind(this) { }
    });

 }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      let formData = this.contactForm.value
      if(this.bannerfile.length > 0){
        for(let i=0;i<this.bannerfile.length;i++){
          let key = `fileNo_${i + 1}`;
          let file = this.bannerfile[i];
          formData[key] = {
            base64: file.file,
            filename: file.fileName,
            mimetype: file.fileType
          };
        }
      }
       this.http.post(environment.API_BASE_URL + +'/submitcontact',formData)
        .subscribe({
          next: res =>{
            successcontact("Thank you! Your message has been sent successfully.");
            this.bannerfile = [];
            this.contactForm.reset();
            this.dropzoneInstance.removeAllFiles(true); 
            this.submitted = false;
          },
          error: err => {
            errorcontact("Sorry! Something went wrong. Please try again later.")
            this.bannerfile=[];
            this.contactForm.reset();
            this.dropzoneInstance.removeAllFiles(true); 
            this.submitted = false;
          }  
        });
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64string = (reader.result as string).split(',')[1]; // remove prefix
        resolve(base64string);
      };

      reader.onerror = error => reject(error);
    });
  }

 
  scrolltop(){
    window.locoScroll.scrollTo(0, {
      duration: 800, // in milliseconds
      easing: [0.25, 0.0, 0.35, 1.0], // cubic-bezier easing (optional)
      offset: 0 // optional offset from top
    });
  }
    

}
