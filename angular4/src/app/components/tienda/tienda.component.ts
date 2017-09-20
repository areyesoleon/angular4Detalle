import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  animations: [
    trigger('marcar',[
      state('inactive',style({
        border:'5px solic #ccc'
      })),
      state('active',style({
        border:'5px solic yellow',
        background: 'red',
        borderRadius: '50px'
      })),
      transition('inactive => active',animate('5s linear')),
      transition('active => inactive',animate('3s linear'))
    ])
  ]
})
export class TiendaComponent implements OnInit {
  public titulo;
  public nombreDelPaque: string;
  public miParque;
  public state;
  constructor() {
    this.titulo = 'Esta es la tienda';
    this.state = 'inactive';
   }
  ngOnInit() {
  }
  mostrarNombre(){
    console.log(this.nombreDelPaque); 
  }
  verDatosParque(event){
    console.log(event);
    this.miParque = event;
  }
  textoRichEditor(content){
    console.log(content)
  }

}
