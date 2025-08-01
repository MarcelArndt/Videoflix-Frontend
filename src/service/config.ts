
//BASE_URL
export const standart_BASE_URL = 'http://127.0.0.1:8000/api/';
export const BASE_URL = 'http://localhost:8000/api/';
export const test_url  = 'http://arndt-dev.de:7595/api/'

//URLs
export const REGISTRATION_URL = BASE_URL + 'registration/';
export const LOGIN_URL = BASE_URL + 'login/';
export const REFRESH_URL = BASE_URL + 'token/refresh/';
export const MAIN_SERVICE_URL = BASE_URL + "media/";
export const FIND_USER_RESET_PASSWORD = BASE_URL + 'find-user/';
export const RESET_PASSWORD = BASE_URL + 'password_reset/';
export const RESEND_EMAIL = BASE_URL + 'resend-email/';
export const UPLOAD_VIDEO = BASE_URL + 'media/';
export const VIDEO_PROGRESS_URL = BASE_URL + 'video/progress/';
export const LOGOUT_URL = BASE_URL + 'logout/';
export const IS_AUTHENTICATED_URL= BASE_URL + 'is-authenticated/';
export const VIDEO_CONVERT_PROGRESS_URL= BASE_URL + 'video/current-progress/';

//Settings
export const MIN_PASSWORD_LENGHT = 8;
export const MAX_VIDEO_UPLOAD_SIZE_IN_MB = 200;
export const UPDATE_INTERVAL_PROGRESS_IN_SEC = 5;
export const ACCESS_TOKEN_EXPIRES_IN_MINUTES = 5
