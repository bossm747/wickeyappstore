import { Component, OnInit } from '@angular/core';
import { WasSSO } from '../../../ui/popover/wassso/wassso.dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../user.service';
import { User } from '../../../app.models';

@Component({
  selector: 'was-sso-btn',
  templateUrl: './wassso-btn.component.html',
  styleUrls: ['../was.component.css'],
})
export class WasSSOBtn implements OnInit {
  /**
 * WickeyAppStore SSO Interface
 *
 * SIMPLY ADD to HTML where appropriate
 * <was-sso-btn></was-sso-btn>
 *
*/
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
  ) {
  }
  ngOnInit(): void {
    console.log('wassobtn ngoninit')
    this.userService.user.subscribe((usr: User) => {
      this.checkLoggingIn();
    });
  }
  checkLoggingIn() {
    console.log('wassso-btn checking logging in');
    setTimeout(() => {
      if (this.userService.userObject.logging_in) {
        // then show the SSO
        console.log('wassso-btn email', this.userService.userObject.token_email);
        const thissso = this.dialog.open(WasSSO, {
          data: { email: this.userService.userObject.token_email }
        });
      }
    }, 1000);
  }

  buttonClick() {
    const thissso = this.dialog.open(WasSSO);
  }

}
