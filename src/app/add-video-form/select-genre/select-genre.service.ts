import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectGenreService {

  constructor() { }

  choices = ['Crime','Romance','Drama','Comedy','Horror','Documentation','Adventure'];

  isMenuOpen:boolean = false
  isFirstTime:boolean = true

  displayChoice:string = 'select Genre';
  
  private isfieldDirty = new BehaviorSubject<boolean>(false);
  isfieldDirty$ = this.isfieldDirty.asObservable();

  private currentChoice = new BehaviorSubject<string>('');
  currentChoice$ = this.currentChoice.asObservable();

  closeMenu(){
    this.isMenuOpen = false
  }

  toggleMenu(){
    this.isfieldDirty.next(true);
    this.isMenuOpen = !this.isMenuOpen
    this.isFirstTime = false;
  }

  selectChoice(choice:string){
    this.displayChoice = choice
    this.currentChoice.next(choice);
    this.closeMenu()
  }


}
