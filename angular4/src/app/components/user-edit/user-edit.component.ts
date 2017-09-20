import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { GLOBAL } from "../../services/global";
import { UserService } from "../../services/user.service";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {

  public title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url: string;
  constructor(
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.title = "Actualizar datos";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  onSubmit() {
    this._userService.updateUser(this.user).subscribe(
      (response) => {
        if (!response.user) {
          this.status = "error";
        }
        else {
          this.status = "success";
          this._uploadService.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.user.image = result.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
              console.log(this.user);
            })
        }
      },
      (error) => {
        let errorMensaje = <any>error;
        if (errorMensaje) {
          this.status = 'error';
        }
      }
    )
  }
  
  public filesToUpload: Array<File>
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
