// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // vehiculoApi,
  // vehiculoApi: process.env.VEHICULO_API,
  vehiculoApi: 'http://54.234.183.98:8082',
  // vehiculoApi: 'http://localhost:8082',
  // vehiculoApi: 'https://obscure-plains-82299.herokuapp.com',
  chargeStationApi: 'https://yles0n9lca.execute-api.us-east-1.amazonaws.com',
  userApi: 'https://limitless-gorge-95066.herokuapp.com',
  // geoApi: 'http://ec2-18-209-66-239.compute-1.amazonaws.com:8090',
  // geoApi: 'https://ec2-18-209-66-239.compute-1.amazonaws.com:8443',
  geoApi: 'http://52.87.255.160:8090',
  firebaseConfig: {
    apiKey: "AIzaSyDUmTKS4UanGOuE1MeIHtEp7sOF2BbrCaQ",
    authDomain: "sac-vehiculos.firebaseapp.com",
    projectId: "sac-vehiculos",
    storageBucket: "sac-vehiculos.appspot.com",
    messagingSenderId: "50299161022",
    appId: "1:50299161022:web:87b37a1790418e5ebe11ef"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
