import * as cookie from 'cookie';

const parseCookies = (req?: any, options: object = {}) => {
  let documentCookie: string = '';
  if (typeof window !== 'undefined') {
    documentCookie = document.cookie;
  }
  console.log(req.headers.cookie)
  return cookie.parse(req ? req.headers.cookie || '' : documentCookie, options);
};
export default parseCookies;
