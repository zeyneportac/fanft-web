import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminLayoutModule } from './pages/admin/admin-layout.module';
import { ClientLayoutModule } from './pages/client/client-layout.module';
import { AddBannerComponent } from './components/add-banner/add-banner.component';
import { AddChoreographieComponent } from './components/add-choreographie/add-choreographie.component';
import { AddCompositionComponent } from './components/add-composition/add-composition.component';
import { AddDisplacementComponent } from './components/add-displacement/add-displacement.component';
import { AddSocialResponsibilityComponent } from './components/add-social-responsibility/add-social-responsibility.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, routingComponents, AddBannerComponent, AddChoreographieComponent, AddCompositionComponent, AddDisplacementComponent, AddSocialResponsibilityComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientLayoutModule,
    AdminLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
