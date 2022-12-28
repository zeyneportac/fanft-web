import { Component, OnInit, Inject } from '@angular/core';
import { BannerService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Banner } from '../../models';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss'],
})
export class AddBannerComponent implements OnInit {
  constructor(
    private _bannerService: BannerService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddBannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  banner: Banner = new Banner();
  _action: Function;
  _userListRenew: boolean = false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.banner = <any>await this._bannerService.findAsync(this.data?.Id);
        console.log(this.banner);
      } catch (error) {
        this._bannerService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(bannertForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (bannerForm.valid) {
      this._translateService
        .get('banner registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(bannerForm))) return;
      this.dialogRef.close(this._userListRenew);
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }

    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }

  async insertActionAsync(bannerForm: NgForm) {
    try {
      console.log(bannerForm.value);
      await this._bannerService.insertAsync(bannerForm.value);
      bannerForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._bannerService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(bannerForm: NgForm) {
    console.log(bannerForm.value);
    try {
      await this._bannerService.updateAsync(
        Object.assign(bannerForm.value, {
          Id: parseInt(this.data?.Id),
        })
      );
      return true;
    } catch (error) {
      this._bannerService.errorNotification(error);
      return false;
    }
  }
}
