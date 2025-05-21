
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
}


