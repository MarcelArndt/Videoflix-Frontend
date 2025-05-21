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
        { name: 'Rythm of Friendship', url:'https//link-zum-video.de'},
        { name: 'majestic Whales', url:'https//link-zum-video.de'},
        { name: 'Whispering Shadow', url:'https//link-zum-video.de'},
        { name: "Baby's secret", url:'https//link-zum-video.de'},
        { name: 'World of Wonders', url:'https//link-zum-video.de'},
        { name: '48 Hours to survive', url:'https//link-zum-video.de'},
        ]},

      documentary: {
        title : 'Documentary',
        content: [ 
        { name: 'majestic Whales', url:'https//link-zum-video.de'},
        { name: "Baby's secret", url:'https//link-zum-video.de'},
        { name: 'World of Wonders', url:'https//link-zum-video.de'},
        ]},


      drama: {
        title : 'Drama',
        content: [
        { name: 'Rythm of Friendship', url:'https//link-zum-video.de'},
        { name: '48 Hours to survive', url:'https//link-zum-video.de'},
        { name: "Chronicle of a Crime", url:'https//link-zum-video.de'},
        { name: 'Breakout', url:'https//link-zum-video.de'},
        { name: 'Whispering Shadow', url:'https//link-zum-video.de'},
        ]},


      romance: {
        title : 'Romance',
        content: [
        { name: 'When i met you', url:'https//link-zum-video.de'},
        { name: "Hate you", url:'https//link-zum-video.de'},
        ]},
  }
}
