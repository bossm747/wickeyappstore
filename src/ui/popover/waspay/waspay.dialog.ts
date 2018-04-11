import { Component, Inject, Input } from '@angular/core';
import { WasAlert } from '../wasalert/wasalert.dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../user.service';

@Component({
  selector: 'was-pay-dialog',
  templateUrl: './waspay.dialog.html',
  styleUrls: ['../was.component.css'],
})
export class WasPay {
  /**
   * Choose payment type. Internal Use
   * Must pass price, title, description, coins, isConsumable, isOwned
   *     this.dialog.open(WasPay, {
      data: {'price': 1.99, 'title': 'Pack One', 'description': 'Intro Pack', 'coins': 100}
    });
  */
  public isApplePayAvail = false; // dictates if the apple pay button is shown.

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<WasPay>,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // set defaults (just for testing)
    if (!this.data) {
      this.data = {'price': 1.99, 'title': 'Pack One', 'description': 'Intro Pack', 'coins': 100, 'isConsumable': false, 'isOwned': false};
    }
    this.isApplePayAvail = this.userService.isApplePayAvailable();
  }
  /**
   * Cancel/close the dialog
   *
   * @memberof WasPay
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  showWebPay() {
    if (this.userService.isLoggedInVal) {
      if (this.data.isOwned === true) {
        this.dialog.open(WasAlert, {
          data: { title: 'Already Owned', body: 'You already own: ' + this.data.title, buttons: ['Cool'] }
        });
      } else {
        this.userService.showWebPay(this.data).then((_goodPurchase: boolean) => {
          if (_goodPurchase) {
            this.dialog.open(WasAlert, {
              data: { title: 'Purchase Successful!', body: 'Your purchase was successful.', buttons: ['Okay'] }
            }).afterClosed().subscribe(result => {
              this.dialogRef.close(true);
            });
          } else {
            this.dialog.open(WasAlert, {
              data: { title: 'Purchase Failed', body: 'Your purchase failed.', buttons: ['Okay'] }
            }).afterClosed().subscribe(result => {
              this.dialogRef.close(false);
            });
          }
        }).catch((_failReason) => {
          console.error('showWebPay:error return:', _failReason);
          if (_failReason !== 'cancelled') {
            this.dialog.open(WasAlert, {
              data: { title: 'Purchase Failed', body: 'Your purchase failed, contact us for help.', buttons: ['Okay'] }
            }).afterClosed().subscribe(result => {
              this.dialogRef.close(false);
            });
          }
        });
      }
    } else {
      this.userService.opensso();
    }
  }

  goToSafari() {
    this.dialog.open(WasAlert, {
      data: { title: 'Apple Pay', body: 'Open app in Safari to enable in-app purchases with Apple Pay.' }
    });
  }
  makeTitle(): string {
    if (this.data.isConsumable === true) {
      return this.data.title + ' / ' + this.data.coins + ' coins';
    } else {
      return this.data.title;
    }
  }
}
