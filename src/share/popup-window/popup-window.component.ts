import { Component, Type, ViewChild, ViewContainerRef, ComponentRef, ElementRef, EventEmitter} from '@angular/core';
import { PopupServiceService } from './popup-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Input } from '@angular/core';

interface PopUpCommunication {
  closePopUp?: EventEmitter<void>;
  changeContent?: EventEmitter<Type<any>>;
  showError?: EventEmitter<string>;
  isLoading?: EventEmitter<boolean>;
}

@Component({
  selector: 'popup-window',
  imports: [CommonModule ],
  templateUrl: './popup-window.component.html',
  styleUrl: './popup-window.component.scss'
})
export class PopupWindowComponent {

  currentInstance:any;
  isLoading = false;
  
  constructor(public popUpService: PopupServiceService ){
    this.componentSubcribtion = this.popUpService.nextComponent$.subscribe( (comp) => {
      if(comp){
        this.loadComponent(comp);
      } else {
        this.clearComponent();
      }
    });
  }

  @Input()animationDuration = 0;

  @ViewChild('popUpContainer', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  currentComponentRef: ComponentRef<any> | null = null;
  componentSubcribtion?: Subscription;
  
  @ViewChild('popUp') popUp!: ElementRef;

  preventClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy(){
    this.popUpService.firstTimeopen = true;
    this.popUpService.isPopUpOpen = false;
    this.componentSubcribtion?.unsubscribe();
  }

  loadComponent(component:Type<any>){
    if(!this.contentContainer) return;
    this.contentContainer.clear();
    this.currentComponentRef = this.contentContainer.createComponent(component);
    this.currentInstance = this.currentComponentRef.instance as PopUpCommunication;
    this.setOutPuts();
  }

  setOutPuts(){
    this.currentInstance.isLoading?.subscribe((state:boolean) => this.isLoading = state);
    this.currentInstance.changeContent?.subscribe((newComponent: Type<any>) => {
    this.loadComponent(newComponent);
    });
    this.currentInstance.showError?.subscribe((errorMessage: string) => {
    console.error('Fehler:', errorMessage);
    });
    this.currentInstance.closePopUp?.subscribe(() => this.closePopUp());
  }

  clearComponent(){
    if(!this.currentComponentRef) return;
    this.currentComponentRef?.destroy()
  }

  openPopUp(component:Type<any>){
    this.popUpService.openPopUp(component)
  }

  ngAfterViewInit(){
    this.popUpService.popUpInit(this.popUp, this.animationDuration)
  }

  closePopUp(){
    if (!this.isLoading){
      this.clearComponent()
      this.popUpService.closePopUp()
    }
  }



}
