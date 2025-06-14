import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { enableIsScrollAbleAnimtion } from '../sign-up/sign-up-form/scrollbar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors,  } from '@angular/forms';
import { IconComponent } from '../../share/icon/icon.component';
import { ValidationHelperClass } from '../../service/ValidationHelperClass';
import { CommonModule } from '@angular/common';
import { SelectGenreComponent } from './select-genre/select-genre.component';
import { SelectGenreService } from './select-genre/select-genre.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-add-video-form',
  imports: [ ReactiveFormsModule, IconComponent, CommonModule, SelectGenreComponent],
  templateUrl: './add-video-form.component.html',
  styleUrl: './add-video-form.component.scss'
})
export class AddVideoFormComponent {


  uploadForm!: FormGroup;
  uploadTitle:string = 'No video upload';
  maxSizeMB:number = 20;
  validation!:ValidationHelperClass;

  constructor(private form: FormBuilder, private selectService:SelectGenreService, private api: ApiService){
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

  @ViewChild('scrollbar')scrollbar!:ElementRef;
  @ViewChild('scrollAnimtion')scrollAnimtion!:ElementRef;
  @ViewChild('fileupload')fileupload!:ElementRef;
  @HostListener('window:resize', ['$event'])

  onWindowResize(event: Event) {
    this.checkScrollbar()
  }

  checkScrollbar(){
    const element = this.scrollbar.nativeElement;
    const parentElement = this.scrollbar.nativeElement.parentElement
    let parentElementHeight = 0
    let elementInnerHeight = 0
    if (parentElement && element) {
      parentElementHeight = parentElement.getBoundingClientRect().height;
      elementInnerHeight = element.scrollHeight;
    }
    const elementouterHight = this.scrollbar.nativeElement.clientHeight;
    const refHeight = document.documentElement.clientHeight;
    if (refHeight / 2 < elementouterHight || parentElementHeight < elementInnerHeight){
      enableIsScrollAbleAnimtion(this.scrollAnimtion)
    }
  }

  ngAfterViewInit(){
    this.checkScrollbar()
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
    console.log('file:', this.uploadForm.value.file);
    console.log('ist File ein File?', this.uploadForm.value.file instanceof File);

    return {
      title: this.uploadForm.value.title,
      description : this.uploadForm.value.description,
      genre : this.uploadForm.value.genre,
      original_file : this.uploadForm.value.file
    }
  }

  postVideo(event:Event){
    event.preventDefault();
    const videoObj = this.makeVideoObj()
    this.api.postVideo(videoObj).subscribe({
  next: (response) => {
    console.log('Upload erfolgreich', response);
    },
    error: (error) => {
      console.error('Fehler beim Upload', error);
    }
  });
  }

}
