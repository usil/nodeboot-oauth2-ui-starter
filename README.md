# Nodeboot Oauth2 Starter UI

This library propose is to make the implementation of the [nodeboot-oauth2-starter](https://github.com/usil/nodeboot-oauth2-starter/wiki) library easier giving you the required ui component. You can use this library in any Angular 13 project.

## Requirements

- Angular 13
- Angular Material (You need to use angular material in your project)

## Setting up the library

### Install it

```cmd
npm install https://github.com/usil/nodeboot-oauth2-ui-starter-dist.git
```

### Setting the api url variable

In your `app.module.ts`:

```typescript
...
import { environment } from 'src/environments/environment';
...

@NgModule({
  ...
  providers: [
    ...
    { provide: 'configuration', useFactory: AppModule.getEnv },
    ...
  ],
  ...
})
export class AppModule {
  static getEnv() {
    return { api: environment.api };
  }
}
```

Where `environment.api` is where the url to the api where `oauth2-starter` is used.

### Making the http interceptor

Create an [http interceptor](https://angular.io/api/common/http/HttpInterceptor), you can use the angular cli `ng g interceptor mainInterceptor`. Set it up so you can send an `Authorization` header with `BEARER YOUR_TOKEN`

```typescript
const secureRequest = request.clone({
  setHeaders: {
    Authorization: `BEARER ${myToken}`,
  },
});

return next.handle(secureRequest);
```

### Using the components

In the module that you want to use import the library:

```typescript
...
import { NodebootOauth2StarterModule } from 'nodeboot-oauth2-starter-ui';
...

@NgModule({
  ...
  imports: [
    ...
    NodebootOauth2StarterModule,
    ...
  ],
  ...
})
export class SomeModule {}
```

Then for the users management interface

```html
<lib-oauth-starter-users></lib-oauth-starter-users>
```

For the clients management interface

```html
<lib-oauth-starter-client></lib-oauth-starter-client>
```

For the roles management interface

```html
<lib-oauth-starter-roles></lib-oauth-starter-roles>
```

For the user profile interface

```html
<lib-oauth-starter-user-profile></lib-oauth-starter-user-profile>
```

For the application part management interface

```html
<lib-oauth-starter-application-part></lib-oauth-starter-application-part>
```

## Road map

- Add support for older angular version
