
export interface CategoryWrapper {
  [key: string]: Category;
}

export interface Category {
  title: string;
  content: CategoryItem[];
}

export interface CategoryItem {
  id:number;
  title: string;
  url: string;
  thumbnail:string,
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

export interface Login {
  email:string,
  password:string
}

export interface Registration {
  email:string,
  username:string,
  password:string,
  repeated_password:string
}

export interface Header {
  Authorization:string
}

export interface Response {
  ok:boolean,
  status:number,
  data:any
}

export interface ResetPassWordForm {
  userId:string,
  token:string,
  password:string,
  repeated_password:string
}

export interface AuthData {
    username: string
    email: string
    token: string
    user_id: number
    email_is_confirmed: boolean
}

export interface SendEmail {
    user_id: string
}






