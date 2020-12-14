// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlAddress:'https://radiant-bayou-53976.herokuapp.com/',
  urlAddress:'http://localhost:5000/',

  firebase: {
    apiKey: "AIzaSyDm9Kmf-F2-hQL5QrwtwI--9LKHz4U64Mo",
    authDomain: "auth-59b16.firebaseapp.com",
    databaseURL: "https://auth-59b16.firebaseio.com",
    projectId: "auth-59b16",
    storageBucket: "auth-59b16.appspot.com",
    messagingSenderId: "322098566281",
    appId: "1:322098566281:web:b5f07e359e7448cf2ce258"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
