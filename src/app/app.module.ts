import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccesosInterceptor } from './config/accesos.interceptor';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AccesosInterceptor, multi:true }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
