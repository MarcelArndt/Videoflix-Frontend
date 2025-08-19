import { Component, ViewChild, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';
import { checkScrollbar } from '../../service/scrollbar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ValidationHelperClass } from '../../service/ValidationHelperClass';
import { CommonModule } from '@angular/common';
import { SelectGenreComponent } from '../../share/select-genre/select-genre.component';
import { SelectGenreService } from '../../share/select-genre/select-genre.service';
import { ApiService } from '../../service/api.service';
import { MediaCategoryService } from '../../service/media-category.service';
import { AlertsService } from '../../share/alerts/alerts.service';
import { Router } from '@angular/router';
import { MAIN_SERVICE_URL } from '../../../config';
import { CategoryItem } from '../../interface/interface';

interface UploadData {
  headline: string;
  description: string;
  genre: string;
}

@Component({
  selector: 'app-edit-video-form',
  imports: [ ReactiveFormsModule, CommonModule, SelectGenreComponent],
  templateUrl: './edit-video-form.component.html',
  styleUrl: './edit-video-form.component.scss'
})
export class EditVideoFormComponent {

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
  patchForm!: FormGroup;
  title:string = 'No video upload';
  validation!:ValidationHelperClass;
  uploadIsInProcess:boolean = false
  currentVideo!:CategoryItem


  constructor(private form: FormBuilder, private selectService:SelectGenreService, private api: ApiService, private service: MediaCategoryService, private alert:AlertsService, private router: Router){
      this.patchForm = this.form.nonNullable.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required]],
    });
    this.validation = new ValidationHelperClass(this.patchForm, {'MIN_PASSWORD_LENGTH':0})
  }

  closeSelectInput(){
    this.selectService.closeMenu()
  }

  ngAfterViewInit(){
    checkScrollbar(this.scrollbar, this.scrollAnimtion)
  }

  ngOnInit(){
    this.selectVideo();
    const selectedChoice = this.selectService.currentChoice$.subscribe((choice)=>{
      this.patchForm.patchValue({genre:choice});
    });
    const idSelectedChoiceTouched = this.selectService.isfieldDirty$.subscribe((isTouched) => {
      if(isTouched){
        this.patchForm.get('genre')?.markAsTouched();
        this.patchForm.get('genre')?.markAsDirty();
      }
    });
  }

  selectVideo(){
    this.service.selectedChoice$.subscribe((video) => {
      if(video){
      this.currentVideo = video
      }
    });

    this.patchForm.patchValue({
      title: this.currentVideo.headline,
      description: this.currentVideo.description
    });

    this.selectService.closeMenu()
    this.selectService.resetChoice()
    this.selectService.selectChoice(this.titleGenre(this.currentVideo.genre))
  }

  titleGenre(string:string){
     return string.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
  }

  makeVideoObj(){
    return {
      headline: this.patchForm.value.title,
      description : this.patchForm.value.description,
      genre : this.patchForm.value.genre,
    }
  }
  
  resetAll(){
    this.title = 'No video upload';
    this.patchForm.patchValue({});
    this.patchForm.reset();
    this.selectService.resetChoice();
  }

async sendRequest():Promise<CategoryItem>{
  const videoObj = this.makeVideoObj() as UploadData;
  const url = MAIN_SERVICE_URL + `${this.currentVideo.id}/`
  this.alert.setAlert('Upload: waiting for Response', false);
  const res = await this.api.patch(url,videoObj)
  this.alert.setAlert('Upload: Video updatet', false);
  return res as CategoryItem
}

async patchVideo(event: Event) {
  event.preventDefault();
  let res = null
  try{
    res = await this.sendRequest();
  }catch(error){
    this.alert.setAlert('Error: Upload was not successful!');
    console.log(error);
  }
  this.resetAll();
  this.closePopUp.emit();
  if (res){
    await this.service.refreshCategorySliderData();
    await this.service.refreshSelectedChoice(res)
  }
}

}
