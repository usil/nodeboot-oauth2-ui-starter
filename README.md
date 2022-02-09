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

### The users management interface

```html
<lib-oauth-starter-users></lib-oauth-starter-users>
```

Here you will see a table with all of the users. You can create, update and delete an user. Also view and update his roles.

![users interface](https://i.ibb.co/HtvNYFB/user.jpg)

### The clients management interface

```html
<lib-oauth-starter-client></lib-oauth-starter-client>
```

Here you will see a table with all of the client. You can create, update and delete an user. Also view and update his roles.

The admin can view the secret key and generate a long live token. Also revoke the client access.

![users interface](https://i.ibb.co/w7krs9H/clients.png)

### The roles management interface

```html
<lib-oauth-starter-roles></lib-oauth-starter-roles>
```

View all of the existing roles and their respective security options.

![roles interface](https://i.ibb.co/CMsDKTC/ROLES.png)

### The user profile interface

```html
<lib-oauth-starter-user-profile></lib-oauth-starter-user-profile>
```

The current user profile. You can change the password.

![roles interface](https://i.ibb.co/gRgbckF/profile.png)

### The application resource management interface

```html
<lib-oauth-starter-application-resource></lib-oauth-starter-application-resource>
```

The resources of an application and their respective options.

![roles interface](https://i.ibb.co/72SwWt9/applicationparts.jpg)

## Road map

- Add support for older angular version
