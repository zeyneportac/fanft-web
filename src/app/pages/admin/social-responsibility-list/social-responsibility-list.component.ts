import { Component, OnInit } from '@angular/core';
import { SocialResponsibilityService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AddSocialResponsibilityComponent,
  DialogWindowComponent,
} from 'src/app/components';
import { SocialResponsibility } from '../../../models';

@Component({
  selector: 'app-social-responsibility-list',
  templateUrl: './social-responsibility-list.component.html',
  styleUrls: ['./social-responsibility-list.component.scss'],
})
export class SocialResponsibilityListComponent implements OnInit {
  constructor(
    private _socialReesponsibilityService: SocialResponsibilityService,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar
  ) {}

  searchText = '';
  socialReesponsibilitys: Array<SocialResponsibility>;
  async ngOnInit() {
    try {
      this.socialReesponsibilitys = <Array<SocialResponsibility>>(
        await this._socialReesponsibilityService.listAsync()
      );
    } catch (error) {
      this._socialReesponsibilityService.errorNotification(error);
    }
  }

  openAddSocialResponsibilityModal(Id = null) {
    const diologRef = this._dialog.open(AddSocialResponsibilityComponent, {
      width: '500px',
      data: this.socialReesponsibilitys.find(
        (socialReesponsibility) => socialReesponsibility.Id == Id
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async socialReesponsibilityDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._socialReesponsibilityService.deleteAsync({ Id });
          this.socialReesponsibilitys.splice(
            this.socialReesponsibilitys.findIndex(
              (socialReesponsibility) => socialReesponsibility.Id == Id
            ),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Social Responsibility information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._socialReesponsibilityService.errorNotification(error);
        }
      }
    });
  }
}
