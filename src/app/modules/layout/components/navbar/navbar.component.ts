import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/users.models';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user: User | null = null;
  constructor(private authServices: AuthService, private router: Router) {}

  ngOnInit() {
    this.authServices.getProfile().subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authServices.logout();
    this.router.navigate(['/login']);
  }
}
