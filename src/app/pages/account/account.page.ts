import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/shared/models/Session';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  session: Session

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.session = this.authService.getSession()
  }

  logout() {
    this.authService.logout()
  }
}
