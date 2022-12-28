import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSearchFilterModule } from 'ng-search-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatModule } from '../../utils';
import {
  AdminSidebarComponent,
  AdminControlSidebarComponent,
  AdminHeaderComponent,
  AdminFooterComponent,
  AdminLayoutComponent,
  DialogWindowComponent,
  AddUserComponent,
} from '../../components/';
import { DashboardComponent, LoginComponent, UserListComponent } from './';
import { BannerListComponent } from './banner-list/banner-list.component';
import { ChoreographieListComponent } from './choreographie-list/choreographie-list.component';
import { CompositionListComponent } from './composition-list/composition-list.component';
import { DisplacementListComponent } from './displacement-list/displacement-list.component';
import { SocialResponsibilityListComponent } from './social-responsibility-list/social-responsibility-list.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminControlSidebarComponent,
    AdminSidebarComponent,
    LoginComponent,
    AddUserComponent,
    DialogWindowComponent,
    UserListComponent,
    BannerListComponent,
    ChoreographieListComponent,
    CompositionListComponent,
    DisplacementListComponent,
    SocialResponsibilityListComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
    NgSearchFilterModule,
    NgxPaginationModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
})
export class AdminLayoutModule {}
