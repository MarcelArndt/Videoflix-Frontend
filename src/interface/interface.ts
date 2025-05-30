
export interface CategoryWrapper {
  [key: string]: Category;
}

export interface Category {
  title: string;
  content: CategoryItem[];
}

export interface CategoryItem {
  id:number;
  name: string;
  url: string;
  placeholder:string,
  headline:string,
  discretion:string,
}

export interface canObjectScroll
  { [category: string]: boolean }



export interface watchedVideo {
  id:number;
  latestTime:Date;
}


export interface User{
    id:string;
    username:string;
    profilPictureUrl:string;
    watchedVideos:string[];
    volume:number;
}

export interface SignUpUser{
   username:string;
}





