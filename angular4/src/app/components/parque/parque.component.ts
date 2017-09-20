import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-parque',
  templateUrl: './parque.component.html',
  styleUrls: ['./parque.component.css']
})
export class ParqueComponent implements OnChanges, OnInit, DoCheck, OnDestroy {
  @Input() nombre: string;
  @Input('metrosCuadrados') metros: number;
  public vegetacion: string;
  public abierto: boolean;
  @Output() pasameLosDatos = new EventEmitter();

  constructor() { 
    this.nombre = 'parque para caballos';
    this.metros = 450;
    this.vegetacion = 'Alta';
    this.abierto= false;
  }
  ngOnInit(){
    console.log('metodo iniciado');
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
  }
  ngDoCheck(){
    console.log('Se ejecuto el DoCheck');
  }
  ngOnDestroy(){
    console.log('Se va a eliminar el componente');
  }
  emitirEvento(){
    this.pasameLosDatos.emit({
      nombre :this.nombre,
      metros :this.metros,
      vegetacion :this.vegetacion,
      abierto: this.abierto,
    })
  }

}
