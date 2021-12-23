# SmplWalletCore

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.0.

## Dependencies

Make sure to install all peer dependencies. This library depends on some older packages and requires several
adjustments.

* "allowSyntheticDefaultImports": true must be added to "compilerOptions" in tsconfig.json
* The following needs to be added to angular.json#projects.APP_NAME.architecture.build.options

```json
{
  "allowedCommonJsDependencies": [
    "keycloak-js",
    "@cosmjs/crypto",
    "@cosmjs/stargate",
    "@cosmjs/proto-signing"
  ]
}
 ```

* The following needs to be added to tsconfig.json#compilerOptions

 ```json
{
  "paths": {
    "path": [
      "node_modules/path-browserify"
    ],
    "stream": [
      "node_modules/stream-browserify"
    ],
    "crypto": [
      "node_modules/crypto-browserify"
    ]
  },
  "allowSyntheticDefaultImports": true
}
```
* The following needs to be added to polyfills.ts
```typescript
import * as Buffer from 'buffer';  // Included with Angular CLI.

(window as any).global = window;
(window as any).Buffer = Buffer.Buffer;
```

## Code scaffolding

Run `ng generate component component-name --project smpl-wallet-core` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module --project smpl-wallet-core`.
> Note: Don't forget to add `--project smpl-wallet-core` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build smpl-wallet-core` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build smpl-wallet-core`, go to the dist folder `cd dist/smpl-wallet-core` and
run `npm publish`.

## Running unit tests

Run `ng test smpl-wallet-core` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
