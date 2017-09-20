import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from "../../services/global";
import { Animal } from "../../models/animal";
import { AnimalService } from "../../services/animal.service";

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css'],
  providers: [AnimalService]
})
export class AnimalDetailsComponent implements OnInit {
  public animals: Animal;
  public url:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAnimal();
  }
  getAnimal(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this._animalService.getAnimal(id).subscribe(
        (response) => {
          if(!response.animal){
            this._router.navigate(['/'])
          }
          else{
            console.log(response.animal);
            this.animals = response.animal;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    })
  }

}
