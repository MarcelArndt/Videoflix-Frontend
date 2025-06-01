import { Injectable } from '@angular/core';
import { CategoryWrapper } from '../interface/interface';
import { CategoryItem } from '../interface/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {

  constructor() { }

  private selectedChoiceSubject = new BehaviorSubject<CategoryItem>({
    id:0,
    title: 'Rollercoaster',
    url: './assets/placeholder/videos/adventure/852364-hd_1280_720_24fps.mp4',
    thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg',
    headline: 'Headline_0',
    discretion:'Test-Discretion'
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
        {id:1, title: 'Rythm of Friendship', url:'https//link-zum-video.de', thumbnail: './assets/placeholder/thumbnails/Frame 165.jpg', headline: 'Headline_1', discretion:'After a mysterious signal disrupts global communications, a reclusive scientist and a rogue pilot team up to uncover its origin. What they find could alter the fate of humanity forever.'},
        {id:2, title: 'Majestic Whales', url:'https//link-zum-video.de', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_2', discretion:'In a city ruled by crime syndicates, a determined detective risks everything to bring down a powerful underworld empire. But the closer he gets to justice, the more dangerous the game becomes.'},
        {id:3, title: 'Whispering Shadow', url:'https//link-zum-video.de', thumbnail: './assets/placeholder/thumbnails/Frame 168.jpg', headline: 'Headline_3',  discretion:'When a young woman inherits a remote mansion, she begins to uncover dark family secrets buried for generations. As strange events unfold, she realizes the house may be hiding something far more sinister.'},
        {id:4, title: "Baby's secret", url:'https//link-zum-video.de', thumbnail: './assets/placeholder/thumbnails/Frame 164.jpg', headline: 'Headline_4',  discretion:'An elite hacker is pulled back into the world he tried to leave behind after discovering a government conspiracy. Racing against time, he must expose the truth before he becomes the next target.'},
        {id:5, title: 'World of Wonders', url:'https//link-zum-video.de', thumbnail: './assets/placeholder/thumbnails/Frame 165.jpg', headline: 'Headline_5', discretion:'During a manned mission to Mars, a sudden disaster leaves one astronaut stranded alone. Battling isolation and dwindling resources, he must survive long enough for a rescue that may never come.'},
        {id:6, title: '48 Hours to survive', url:'https//link-zum-video.de', thumbnail: './assets/placeholder/thumbnails/Frame 170.jpg', headline: 'Headline_6', discretion:'After a mysterious signal disrupts global communications, a reclusive scientist and a rogue pilot team up to uncover its origin. What they find could alter the fate of humanity forever.'},
        ]},

      documentary: {
        title : 'Adventure',
        content: [ 
        {id:7, title: 'Rollercoaster', url:'./assets/placeholder/videos/adventure/852364-hd_1280_720_24fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_6', discretion:'After a mysterious signal disrupts global communications, a reclusive scientist and a rogue pilot team up to uncover its origin. What they find could alter the fate of humanity forever.'},
        {id:8, title: 'Nature Survival', url:'./assets/placeholder/videos/adventure/2711092-uhd_2560_1440_24fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_7', discretion:'In a city ruled by crime syndicates, a determined detective risks everything to bring down a powerful underworld empire. But the closer he gets to justice, the more dangerous the game becomes.'},
        {id:9, title: 'mountain Peak', url:'./assets/placeholder/videos/adventure/2894895-uhd_2560_1440_24fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_8', discretion:'When a young woman inherits a remote mansion, she begins to uncover dark family secrets buried for generations. As strange events unfold, she realizes the house may be hiding something far more sinister.'},
        {id:10, title: 'Hot-Air Balloon on Air', url:'./assets/placeholder/videos/adventure/3018542-hd_1920_1080_24fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_8', discretion:'An elite hacker is pulled back into the world he tried to leave behind after discovering a government conspiracy. Racing against time, he must expose the truth before he becomes the next target.'},
        {id:11, title: 'Dreamleand', url:'./assets/placeholder/videos/adventure/4133023-uhd_2560_1440_30fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_9', discretion:'During a manned mission to Mars, a sudden disaster leaves one astronaut stranded alone. Battling isolation and dwindling resources, he must survive long enough for a rescue that may never come.'},
        ]},


      drama: {
        title : 'Horror',
        content: [
        {id:12, title: 'Lonely Child', url:'./assets/placeholder/videos/horror/4882771-uhd_2732_1440_25fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_10', discretion:'After a mysterious signal disrupts global communications, a reclusive scientist and a rogue pilot team up to uncover its origin. What they find could alter the fate of humanity forever.'},
        {id:13, title: 'Corn Witch', url:'./assets/placeholder/videos/horror/5408135-hd_1920_1080_25fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_11', discretion:'In a city ruled by crime syndicates, a determined detective risks everything to bring down a powerful underworld empire. But the closer he gets to justice, the more dangerous the game becomes.'},
        {id:14, title: 'Es', url:'./assets/placeholder/videos/horror/5427565-uhd_2732_1440_25fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg',headline: 'Headline_12', discretion:'When a young woman inherits a remote mansion, she begins to uncover dark family secrets buried for generations. As strange events unfold, she realizes the house may be hiding something far more sinister.'},
        {id:15, title: 'Sabrina', url:'./assets/placeholder/videos/horror/5435216-uhd_2732_1440_25fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_13', discretion:'An elite hacker is pulled back into the world he tried to leave behind after discovering a government conspiracy. Racing against time, he must expose the truth before he becomes the next target.'},
        {id:16, title: 'Ghostland', url:'./assets/placeholder/videos/horror/5435326-uhd_2732_1440_25fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_14', discretion:'During a manned mission to Mars, a sudden disaster leaves one astronaut stranded alone. Battling isolation and dwindling resources, he must survive long enough for a rescue that may never come.'},
        {id:17, title: 'Zombie Breakout', url:'./assets/placeholder/videos/horror/5436094-uhd_2732_1440_25fps.mp4', thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg', headline: 'Headline_15', discretion:'After a mysterious signal disrupts global communications, a reclusive scientist and a rogue pilot team up to uncover its origin. What they find could alter the fate of humanity forever.'},
        ]},


      romance: {
        title : 'Romance',
        content: [
        {id:18, title: 'When i met you', url:'https//link-zum-video.de', thumbnail: './assets/placeholder/thumbnails/Frame 170 (1).jpg', headline: 'Headline_16', discretion:'After a mysterious signal disrupts global communications, a reclusive scientist and a rogue pilot team up to uncover its origin. What they find could alter the fate of humanity forever.'},
        {id:19, title: "Hate you", url:'https//link-zum-video.de', thumbnail: './assets/placeholder/thumbnails/Frame 171.jpg', headline: 'Headline_17', discretion:'In a city ruled by crime syndicates, a determined detective risks everything to bring down a powerful underworld empire. But the closer he gets to justice, the more dangerous the game becomes.'},
        ]},
  }
}
