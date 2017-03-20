Angular2 & ASP.NET Core + IdentityServer4
===================

The following project provides the necessary code to run an Angular2 application  - **Typescript and Webpack** - running on ASP.NET Core and connecting to an OpenID Connect implementation - **IdentityServer4**.

----------

Running the application
-------------

You'll have to run the following commands: (for more detailed information refer to this [post][1]

 - dotnet restore
 - dotnet publish
>**Note:**
> If you ran into an error related to typings when running dotnet publish, then run the following command:
> 
>  **npm install typings**
> 
> Finally proceed to run **dotnet publish** again

Now that you have all the packages restored (nuget and npm) we'll proceed to run or debug the application.

If you want to run the application, run the following command:

 - dotnet run

If you want to run the application (in Development mode), run the following command:

 - dotnet run --environment="Development"

To debug the code, simply debug the code in either Visual Studio Preview for Mac of Visual Studio Code.
>**Note:**
>
>I just found out that if you want to open the solution file in Visual Studio 2017 it won't work, instead open up the csproj file.

Configuration files
-------------
There are two configuration files, one for *Production* and one for *Development*, these files can be found under **config** folder.

These two files are being referenced by Webpack, these settings are available in the application. Specifically, these settings are used by oidc-client to configure settings such us:

 - **authority**  - OpenID Connect server - IdentityServer4 in our case
 - **client_id** - unique identifier for your application, make sure your
   IdentityServer4 has the same id for this application
 - **redirect_uri** -
   angular2 module used to finalize the handshake
 - **post_logout_redirect_uri** - URI to redirect to after a user
   successfully logs out
 - **response_type** - OpenID Connect response types
   (for more information refer [here] [2])
 - and more ...

If you are wondering how we are inserting these settings into Webpack, open up **webpack.config.js**, after all the variable declarations you will notice an if statement, this is used to switch between *Development* or *Production* settings, now, scroll down towards the plugins section, definePlugin is used to define the different settings - to retrieve them, use (in this case) process.env.your_setting - open up auth.service.ts and look towards the end of the file:
```
const settings: any = {
  authority: process.env.authority,
  client_id: process.env.client_id,
  redirect_uri: process.env.redirect_uri,
  post_logout_redirect_uri: 
  process.env.post_logout_redirect_uri,
  response_type: process.env.response_type,
  scope: process.env.scope,
  silent_redirect_uri: process.env.silent_redirect_uri,
  filterProtocolClaims: process.env.filterProtocolClaims,
  loadUserInfo: process.env.loadUserInfo
};
```

Authentication files
-------------
This sample application has three main files to manage authentication all under ClientApp - app - components - shared - services folder:

**auth-guard.service.ts** - this module is in charge of validating if a user has been successfully authenticated or not, granting or denying access to secured module. In order to secure a module, open up app.module.ts (under ClientApp - app) and look at counter and fetch-data (under imports section) you will see the property *canActivate*, this property along with the declaration under *providers* section are the ones required to secure your angular2 modules.

**auth.service.ts** - this module contains the necessary functions to log a user in or out, additionally it provides wrappers to HTTP calls.

**global.events.manager.ts** - this module exposes an Observable<boolean> that is in charge of sending a notification to our navmenu module in order to display additional menu items after a user has been successfully logged in. Under *auth.service.ts - endSigninMainWindow function* you will notice a reference to this module and is passing the value of true, now if you open up *navmenu.component.ts* you will notice that we are subscribing to this observable.


### Support StackEdit

[![](https://cdn.monetizejs.com/resources/button-32.png)](https://monetizejs.com/authorize?client_id=ESTHdCYOi18iLhhO&summary=true)

[StackEdit](https://stackedit.io/) is a full-featured, open-source Markdown editor based on PageDown, the Markdown library used by Stack Overflow and the other Stack Exchange sites.


  [1]: https://medium.com/@jorge.cotillo/asp-net-core-angular2-openid-connect-using-visual-studio-code-ed10327bb31a#.5gbeo8jph
  [2]: http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#RegistryContents
  [3]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"
  [4]: http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference
  [5]: https://code.google.com/p/google-code-prettify/
  [6]: http://highlightjs.org/
  [7]: http://bramp.github.io/js-sequence-diagrams/
  [8]: http://adrai.github.io/flowchart.js/
