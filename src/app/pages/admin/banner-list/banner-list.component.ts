import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBannerComponent, DialogWindowComponent } from 'src/app/components';
import { Banner } from '../../../models';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
})
export class BannerListComponent implements OnInit {
  constructor(
    private _bannerService: BannerService,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar
  ) {}

  searchText = '';
  banners: Array<Banner>;
  async ngOnInit() {
    try {
      this.banners = <Array<Banner>>await this._bannerService.listAsync();
    } catch (error) {
      this._bannerService.errorNotification(error);
    }
  }

  openAddBannerModal(Id = null) {
    const diologRef = this._dialog.open(AddBannerComponent, {
      width: '500px',
      data: this.banners.find((banner) => banner.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async bannerDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._bannerService.deleteAsync({ Id });
          this.banners.splice(
            this.banners.findIndex((banner) => banner.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Banner information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._bannerService.errorNotification(error);
        }
      }
    });
  }
}
