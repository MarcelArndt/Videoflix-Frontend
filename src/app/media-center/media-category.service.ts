import { Injectable } from '@angular/core';
import { CategoryWrapper } from '../../interface/interface';
import { CategoryItem } from '../../interface/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {

  constructor() { }

  private selectedChoiceSubject = new BehaviorSubject<CategoryItem>({
    name: 'Rollercoaster',
    url: './assets/placeholder/videos/adventure/852364-hd_1280_720_24fps.mp4',
    placeholder: './assets/placeholder/thumbnails/Frame 167.jpg',
  });

   selectedChoice$ = this.selectedChoiceSubject.asObservable();


  switchCurrentChoice(category:string, index:number){
    const newItem = JSON.parse(JSON.stringify(this.dataquarry[category].content[index]));
     this.selectedChoiceSubject.next({ ...newItem });
  }

  dataquarry: CategoryWrapper  = {
      newOnVideoflix: {
        title : 'New On Videoflix',
        content: [
        { name: 'Rythm of Friendship', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 165.jpg'},
        { name: 'Majestic Whales', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Whispering Shadow', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 168.jpg'},
        { name: "Baby's secret", url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 164.jpg'},
        { name: 'World of Wonders', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 165.jpg'},
        { name: '48 Hours to survive', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 170.jpg'},
        ]},

      documentary: {
        title : 'Adventure',
        content: [ 
        { name: 'Rollercoaster', url:'./assets/placeholder/videos/adventure/852364-hd_1280_720_24fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Nature Survival', url:'./assets/placeholder/videos/adventure/2711092-uhd_2560_1440_24fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'mountain Peak', url:'./assets/placeholder/videos/adventure/2894895-uhd_2560_1440_24fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Hot-Air Balloon on Air', url:'./assets/placeholder/videos/adventure/3018542-hd_1920_1080_24fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Dreamleand', url:'./assets/placeholder/videos/adventure/4133023-uhd_2560_1440_30fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        ]},


      drama: {
        title : 'Horror',
        content: [
        { name: 'Lonely Child', url:'./assets/placeholder/videos/horror/4882771-uhd_2732_1440_25fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Corn Witch', url:'./assets/placeholder/videos/horror/5408135-hd_1920_1080_25fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Es', url:'./assets/placeholder/videos/horror/5427565-uhd_2732_1440_25fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Sabrina', url:'./assets/placeholder/videos/horror/5435216-uhd_2732_1440_25fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Ghostland', url:'./assets/placeholder/videos/horror/5435326-uhd_2732_1440_25fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: 'Zombie Breakout', url:'./assets/placeholder/videos/horror/5436094-uhd_2732_1440_25fps.mp4', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        ]},


      romance: {
        title : 'Romance',
        content: [
        { name: 'When i met you', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 170 (1).jpg'},
        { name: "Hate you", url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 171.jpg'},
        ]},
  }
}
