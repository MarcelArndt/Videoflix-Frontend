
export interface CategoryWrapper {
  [key: string]: Category;
}

export interface Category {
  title: string;
  content: CategoryItem[];
}

export interface CategoryItem {
  name: string;
  url: string;
  placeholder:string,
  headline:string,
  discretion:string,
}

export interface canObjectScroll
  { [category: string]: boolean }



