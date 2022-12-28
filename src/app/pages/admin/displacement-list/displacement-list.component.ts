import { Component, OnInit } from '@angular/core';
import { DisplacementService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AddDisplacementComponent,
  DialogWindowComponent,
} from 'src/app/components';
import { Displacement } from '../../../models';

@Component({
  selector: 'app-displacement-list',
  templateUrl: './displacement-list.component.html',
  styleUrls: ['./displacement-list.component.scss'],
})
export class DisplacementListComponent implements OnInit {
  constructor(
    private _displacementService: DisplacementService,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar
  ) {}

  searchText = '';
  displacements: Array<Displacement>;
  async ngOnInit() {
    try {
      this.displacements = <Array<Displacement>>(
        await this._displacementService.listAsync()
      );
    } catch (error) {
      this._displacementService.errorNotification(error);
    }
  }

  openAddDisplacementModal(Id = null) {
    const diologRef = this._dialog.open(AddDisplacementComponent, {
      width: '500px',
      data: this.displacements.find((displacement) => displacement.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async displacementDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._displacementService.deleteAsync({ Id });
          this.displacements.splice(
            this.displacements.findIndex(
              (displacement) => displacement.Id == Id
            ),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Displacement information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._displacementService.errorNotification(error);
        }
      }
    });
  }
}
