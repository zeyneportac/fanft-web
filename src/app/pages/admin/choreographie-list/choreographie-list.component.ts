import { Component, OnInit } from '@angular/core';
import { ChoreographieService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AddChoreographieComponent,
  DialogWindowComponent,
} from 'src/app/components';
import { Choreographie } from '../../../models';

@Component({
  selector: 'app-choreographie-list',
  templateUrl: './choreographie-list.component.html',
  styleUrls: ['./choreographie-list.component.scss'],
})
export class ChoreographieListComponent implements OnInit {
  constructor(
    private _choreographieService: ChoreographieService,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar
  ) {}

  searchText = '';
  choreographies: Array<Choreographie>;
  async ngOnInit() {
    try {
      this.choreographies = <Array<Choreographie>>(
        await this._choreographieService.listAsync()
      );
    } catch (error) {
      this._choreographieService.errorNotification(error);
    }
  }

  openAddChoreographieModal(Id = null) {
    const diologRef = this._dialog.open(AddChoreographieComponent, {
      width: '500px',
      data: this.choreographies.find((choreographie) => choreographie.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async choreographieDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._choreographieService.deleteAsync({ Id });
          this.choreographies.splice(
            this.choreographies.findIndex(
              (choreographie) => choreographie.Id == Id
            ),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Choreographie information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._choreographieService.errorNotification(error);
        }
      }
    });
  }
}
