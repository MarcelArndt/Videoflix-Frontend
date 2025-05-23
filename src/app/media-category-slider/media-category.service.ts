import { Injectable } from '@angular/core';
import { CategoryWrapper } from '../../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {

  constructor() { }




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
        title : 'Documentary',
        content: [ 
        { name: 'Majestic Whales', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 167.jpg'},
        { name: "Baby's secret", url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 164.jpg'},
        { name: 'World of Wonders', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 165.jpg'},
        ]},


      drama: {
        title : 'Drama',
        content: [
        { name: 'Rythm of Friendship', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 165.jpg'},
        { name: '48 Hours to survive', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 170.jpg'},
        { name: "Chronicle of a Crime", url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 165.jpg'},
        { name: 'Breakout', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 172.jpg'},
        { name: 'Whispering Shadow', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 168.jpg'},
        ]},


      romance: {
        title : 'Romance',
        content: [
        { name: 'When i met you', url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 170 (1).jpg'},
        { name: "Hate you", url:'https//link-zum-video.de', placeholder: './assets/placeholder/thumbnails/Frame 171.jpg'},
        ]},
  }
}
