import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from "../../services/global";
import { Animal } from "../../models/animal";
import { AnimalService } from "../../services/animal.service";


@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  providers: [AnimalService]
})
export class AnimalsComponent implements OnInit {
  public title: string;
  public animals: Animal[];
  public url;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService
  ) {
    this.title = "Listado de animales";
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals() {
    this._animalService.getAnimals().subscribe(
      response => {
        this.animals = response.animals;
      }, error => {
        console.log(error);
      }
    )
  }

}
