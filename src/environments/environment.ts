// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apirest local
  apiUrl: "http://localhost:3000/api",
  // apiUrlMedia: "http://localhost:3000/api/uploads",

  mediaUrlRemoto: 'https://res.cloudinary.com/dmv6aukai/image/upload/v1741275492/articlesApp/uploads',
  // apiUrlMedia: 'https://https://backend-bidmaster-mean.vercel.app/api/uploads',
  
  //remoto
  // apiUrl: "https://backend-bidmaster-mean.vercel.app/api",
  apiUrlMedia: "https://backend-bidmaster-mean.vercel.app/api/uploads/",

  clientSandboxId: 'AXlazeNsZ0CmjfJIronSzcqzw4hLHkcoVEM5fO5BY7AbD-_GhKoKezRcavq6-T4kQuRqaTXFB_VXmheG',
  clientId: '',
  clientGoogle: '291137676127-svvuuca518djs47q2v78se9q6iggi4nq.apps.googleusercontent.com',

  

};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
