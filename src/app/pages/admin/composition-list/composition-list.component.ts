import { Component, OnInit } from '@angular/core';
import { CompositionService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AddCompositionComponent,
  DialogWindowComponent,
} from 'src/app/components';
import { Composition } from '../../../models';

@Component({
  selector: 'app-composition-list',
  templateUrl: './composition-list.component.html',
  styleUrls: ['./composition-list.component.scss'],
})
export class CompositionListComponent implements OnInit {
  constructor(
    private _compositionService: CompositionService,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar
  ) {}

  searchText = '';
  compositions: Array<Composition>;
  async ngOnInit() {
    try {
      this.compositions = <Array<Composition>>(
        await this._compositionService.listAsync()
      );
    } catch (error) {
      this._compositionService.errorNotification(error);
    }
  }

  openAddCompositionModal(Id = null) {
    const diologRef = this._dialog.open(AddCompositionComponent, {
      width: '500px',
      data: this.compositions.find((composition) => composition.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async compositionDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._compositionService.deleteAsync({ Id });
          this.compositions.splice(
            this.compositions.findIndex((composition) => composition.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Composition information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._compositionService.errorNotification(error);
        }
      }
    });
  }
}
