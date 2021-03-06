import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Identificate"
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    console.log(this._userService.getIdentity());
    console.log(this._userService.getToken());
  }
  onSubmit() {
    this._userService.signup(this.user).subscribe(
      (response) => {
        this.identity = response.user;
        if (!this.identity && !this.identity._id) {
          console.log('El usuario no se ha logueado correctamente');
        }
        else {
          this.identity.password = '';
          localStorage.setItem('identity',JSON.stringify(this.identity));
          //conseguir el token
          this._userService.signup(this.user, 'true').subscribe(
            (response) => {
              this.token = response.token;
              if (this.token.lenght <= 0) {
                console.log('El token no se a generado');
              }
              else {
                localStorage.setItem('token',this.token);
                this.status = 'success';
                this._router.navigate(['/']);
              }
            },
            (error) => {
              console.log(error);
            }
          )
        }
      },
      (error) => {
        this.status = 'error';
        if (!error) {

        }
      }
    )
    console.log(this.user)
  }

}
