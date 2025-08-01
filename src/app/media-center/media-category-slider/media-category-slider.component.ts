import { Component, ElementRef, QueryList, ViewChildren, HostListener, ChangeDetectorRef} from '@angular/core';
import { MediaCategoryService } from '../../../service/media-category.service';
import { CommonModule } from '@angular/common';
import { Category, canObjectScroll } from '../../../interface/interface';
import { IconComponent } from '../../../share/icon/icon.component';



@Component({
  selector: 'app-media-category-slider',
  imports: [ CommonModule, IconComponent ],
  templateUrl: './media-category-slider.component.html',
  styleUrls: ['./media-category-slider.component.scss','./spinner.scss'],
})
export class MediaCategorySliderComponent {
constructor(public service: MediaCategoryService, private cdr: ChangeDetectorRef){}

@ViewChildren('scrollWrapper') scrollWrappers!: QueryList<ElementRef<HTMLDivElement>>;

canScrollLeft: canObjectScroll = {};
canScrollRight:canObjectScroll = {};
isData:boolean = false

@HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkAllScrollPositions();
  }

  async ngOnInit(){
  this.isData = this.service.checkForEmpty();
  }

  ngAfterViewInit() {
    setTimeout(() => {this.checkAllScrollPositions()}, 500);
      this.service.newestVideo$.subscribe((video)=>{
    this.checkAllScrollPositions();
    this.cdr.detectChanges();
  });
  }

  arrayWithAllKeysOfItems(category: string): string[] {
    return Object.keys(this.service.dataQuarry[category].content);
  }

  onScroll(event: Event, category: string) {
    const targetAsHTMLElement = event.target as HTMLElement;
    this.updateScrollButtons(targetAsHTMLElement, category);
  }

  checkAllScrollPositions() {
    this.scrollWrappers.forEach((ref, index) => {
      const category = this.service.allCategoryKey[index];
      this.updateScrollButtons(ref.nativeElement, category);
    });
  }

  updateScrollButtons(element: HTMLElement, category: string) {
  this.canScrollLeft[category] = element.scrollLeft > 0;
  this.canScrollRight[category] = element.scrollLeft + element.clientWidth < (element.scrollWidth - 15) ;
  }

  scrollTo(category: string, direction:string = ""){
    const movingSpeed =  direction == "next" || direction == "right" ? 300 : -300; 
    const index = this.service.allCategoryKey.indexOf(category);
    const element = this.scrollWrappers.get(index)?.nativeElement;
    if (element) {
      element.scrollBy({ left: movingSpeed, behavior: 'smooth' });
      setTimeout(() => this.updateScrollButtons(element, category), 300);
    }
  }
}
