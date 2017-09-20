import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from "../../services/global";
import { Animal } from "../../models/animal";
import { AnimalService } from "../../services/animal.service";
import { UserService } from "../../services/user.service";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [AnimalService,UserService]
})
export class ListComponent implements OnInit {
  public title: string;
  public animals: Animal[];
  public token;
  public busqueda;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService,
  ) {
    this.title = "Listado de animales";
    this.token = _userService.getToken();
  }

  ngOnInit() {
    this.getAnimals();
  }

  deleteAnimal(id){
    $('#exampleModal-'+id).modal('hide');
    this._animalService.deleteAnimal(this.token,id).subscribe(
      response => {
        console.log(response);
        this.getAnimals()
      },
      error => {
        console.log(error); 
      }
    )
  }

  getAnimals(){
    this._animalService.getAnimals().subscribe(
      response => {
        this.animals = response.animals;
      }, error => {
        console.log(error);
      }
    )
  }

}
