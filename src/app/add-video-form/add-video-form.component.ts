import { Component, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { checkScrollbar } from '../../service/scrollbar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors,  } from '@angular/forms';
import { IconComponent } from '../../share/icon/icon.component';
import { ValidationHelperClass } from '../../service/ValidationHelperClass';
import { CommonModule } from '@angular/common';
import { SelectGenreComponent } from './select-genre/select-genre.component';
import { SelectGenreService } from './select-genre/select-genre.service';
import { ApiService } from '../../service/api.service';
import { HttpEventType } from '@angular/common/http';
import { VideouploadLoadingScreenComponent } from './videoupload-loading-screen/videoupload-loading-screen.component';
import { MediaCategoryService } from '../../service/media-category.service';
import { AlertsService } from '../../share/alerts/alerts.service';
import { MAX_VIDEO_UPLOAD_SIZE_IN_MB } from '../../../config';
import { Router } from '@angular/router';
import { VideoStatus } from '../../interface/interface';
import { firstValueFrom } from 'rxjs';

interface UploadData {
  title: string;
  description: string;
  genre: string;
  original_file: File;
}

@Component({
  selector: 'app-add-video-form',
  imports: [ ReactiveFormsModule, IconComponent, CommonModule, SelectGenreComponent, VideouploadLoadingScreenComponent],
  templateUrl: './add-video-form.component.html',
  styleUrl: './add-video-form.component.scss'
})
export class AddVideoFormComponent {

  @Output() uploadComplete = new EventEmitter<void>();
  @Output()isLoading = new EventEmitter<boolean>();
  @Output()closePopUp = new EventEmitter<boolean>();
  @ViewChild('scrollbar')scrollbar!:ElementRef;
  @ViewChild('scrollAnimtion')scrollAnimtion!:ElementRef;
  @ViewChild('fileupload')fileupload!:ElementRef;
  @HostListener('window:resize', ['$event'])

  onWindowResize(event: Event) {
    checkScrollbar(this.scrollbar, this.scrollAnimtion)
  }
  uploadForm!: FormGroup;
  uploadTitle:string = 'No video upload';
  maxSizeMB:number = MAX_VIDEO_UPLOAD_SIZE_IN_MB ;
  validation!:ValidationHelperClass;
  uploadProcess:number = 0
  uploadIsInProcess:boolean = false


  constructor(private form: FormBuilder, private selectService:SelectGenreService, private api: ApiService, private service: MediaCategoryService, private alert:AlertsService, private router: Router){
      this.uploadForm = this.form.nonNullable.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      file: [null, [Validators.required, this.maxFileSizeValidator()]],
    });
    this.validation = new ValidationHelperClass(this.uploadForm, {'MIN_PASSWORD_LENGTH':0})
  }

  closeSelectInput(){
    this.selectService.closeMenu()
  }

  maxFileSizeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file) return null;
    if (file.size > this.maxSizeMB * 1024 * 1024) {
      return { maxFileSize: true };
    }
    return null;
  };
}

  ngAfterViewInit(){
    checkScrollbar(this.scrollbar, this.scrollAnimtion)
  }

  ngOnInit(){
    const selectedChoice = this.selectService.currentChoice$.subscribe((choice)=>{
      this.uploadForm.patchValue({genre:choice});
    });
    const idSelectedChoiceTouched = this.selectService.isfieldDirty$.subscribe((isTouched) => {
      if(isTouched){
        this.uploadForm.get('genre')?.markAsTouched();
        this.uploadForm.get('genre')?.markAsDirty();
      }
    });
  }

  onFileSelected(event:Event){
    const file = this.fileupload.nativeElement.files[0];
    this.uploadForm.patchValue({ file });
    this.uploadForm.get('file')?.updateValueAndValidity();
    const fileControl = this.uploadForm.get('file')
    if (fileControl?.errors?.['maxFileSize']){
      this.uploadTitle = "Can't load Data"
      return
    }
    this.uploadTitle = file ? file.name : 'No video upload'; 
    if (this.uploadTitle.length <= 18 ) return
    const dotindex = this.uploadTitle.lastIndexOf('.');
    const extensionPart = this.uploadTitle.substring(dotindex);
    this.uploadTitle = this.uploadTitle.substring(0,10 ) + ".." + extensionPart
  }

  makeVideoObj(){
    return {
      title: this.uploadForm.value.title,
      description : this.uploadForm.value.description,
      genre : this.uploadForm.value.genre,
      original_file: this.uploadForm.value.file
    }
  }
  
  resetAll(){
    this.uploadProcess = 0;
    this.uploadTitle = 'No video upload';
    this.uploadForm.patchValue({});
    this.uploadForm.reset();
    this.selectService.resetChoice();
  }

async checkForFirstVideoAndRefresh(){
  const currentChoice = await firstValueFrom(this.service.selectedChoice$);
  if (this.service.lengthOfData > 0 && !currentChoice){
     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/media']);
    });
  }
}

sendRequest(videoObj:UploadData){
this.api.postVideo(videoObj).subscribe(async event => {
    if (event.type == HttpEventType.Response) {
      this.service.setNewNewestVideoSubject(event.body);
      this.uploadComplete.emit();
      this.isLoading.emit(false);
      this.alert.setAlert('Upload was successfully.', false);
      this.uploadIsInProcess = false;
      await this.service.startGlobalVideoStatusPulling();
      this.closePopUp.emit();
      await this.service.refreshCategorySliderData();
      await this.checkForFirstVideoAndRefresh();
    } else {
      this.closePopUp.emit();
      this.uploadComplete.emit();
      this.uploadIsInProcess = false;
      this.isLoading.emit(false);
      this.alert.setAlert('Upload: waiting for Response', false);
    }
  });
}

async postVideo(event: Event) {
  event.preventDefault();
  this.isLoading.emit(true);
  this.uploadIsInProcess = true;
  const videoObj = this.makeVideoObj() as UploadData;
  this.resetAll();
  try{
    this.sendRequest(videoObj);
  }catch(error){
    this.alert.setAlert('Error: Upload was not successful!');
    console.log(error);
  }
  
}

}
