import { Component, OnInit } from '@angular/core';

import {AuthService} from '../auth.service';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated
      .distinctUntilChanged() // only emit when current val is diff from last
      .subscribe(isAuthenticated => {
          this.logged = isAuthenticated
        });
  }

  logout() {
    this.authService.logout();
  }

}
