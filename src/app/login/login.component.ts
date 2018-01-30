import { Component, OnInit } from '@angular/core';
import {GC_AUTH_TOKEN, GC_USER_ID} from '../constants';
import {AuthService} from '../auth.service';
import {CreateUserMutationResponse, SIGNIN_USER_MUTATION} from '../graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = true;
  email = '';
  password = '';
  name = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  confirm() {
    if (this.login) {
      this.apollo.mutate<CreateUserMutationResponse>({
        mutation: SIGNIN_USER_MUTATION,
        variables: {
          email: this.email,
          password: this.password
        }
      }).subscribe((result) => {
        const id = result.data.signinUser.user.id;
        const token = result.data.signinUser.token;
        this.saveUserData(id, token);

        this.router.navigate(['/']);
      }, (error) => {
        alert(error)
      });
    }
  }

  saveUserData(id, token) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.authService.setUserId(id);
  }

}
