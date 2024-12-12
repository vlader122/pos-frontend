import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './login/login.component';
import { AccesosGuard } from './config/accesos.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path:'login',
                component: LoginComponent
            },
            {
                path: '', component: AppLayoutComponent,
                children: [
                   { path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule) }
                ],
                canActivate: [AccesosGuard]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
