
export interface CategoryWrapper {
  [key: string]: Category;
}

export interface Category {
  title: string;
  content: CategoryItem[];
}

export interface CategoryItem {
  id:number;
  url: string;
  thumbnail:string,
  headline:string,
  description:string,
  is_converted:boolean;
  current_convert_state:number;
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

export type Response = Record<string, any>;

export interface ResetPassWordForm {
  userId:string,
  token:string,
  password:string,
  repeated_password:string
}

export interface AuthData {
    username: string,
    email: string,
    token: string,
    user_id: number,
    email_is_confirmed: boolean
}

export interface SendEmail {
    user_id: string
}

export interface videoProgress {
  current_time:number,
  is_finished:boolean,
  updated_at:string,
  id:number
}






