import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { AuthService } from './components/shared/services/auth.service';
import { GlobalEventsManager } from './components/shared/services/global.events.manager';
import { AuthGuardService } from './components/shared/services/auth-guard.service';
import { CallbackComponent } from './components/callback/callback.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        CallbackComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'callback', component: CallbackComponent },
            { path: 'counter', component: CounterComponent, canActivate:[AuthGuardService] },
            { path: 'fetch-data', component: FetchDataComponent, canActivate:[AuthGuardService] },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [ AuthService, AuthGuardService, GlobalEventsManager ],
    exports: [
        RouterModule
    ]
})
export class AppModule {
}
