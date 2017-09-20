import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from "./services/user.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from "./services/global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements DoCheck, OnInit {
  public title: string;
  public emailContacto: string;
  public identity;
  public url:string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.title = 'NGZOO';
    this.url = GLOBAL.url;
  }
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}
