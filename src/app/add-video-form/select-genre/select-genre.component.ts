import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { CommonModule } from '@angular/common';
import { SelectGenreService } from './select-genre.service';

@Component({
  selector: 'app-select-genre',
  imports: [ IconComponent, CommonModule],
  templateUrl: './select-genre.component.html',
  styleUrl: './select-genre.component.scss'
})
export class SelectGenreComponent {
  constructor(public service:SelectGenreService){}

  preventChoiceklick(event:Event){
    event.stopPropagation()
  }





}
