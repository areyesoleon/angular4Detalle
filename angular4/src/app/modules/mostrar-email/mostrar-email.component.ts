import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-email',
  templateUrl: './mostrar-email.component.html',
  styleUrls: ['./mostrar-email.component.css']
})
export class MostrarEmailComponent implements OnInit {
  public title:string;
  public emailContacto:string;
  constructor() { }

  ngOnInit() {
    this.title = 'Email Contacto';
    this.emailContacto = localStorage.getItem('emailContacto');
  }
  ngDoCheck(){
    this.emailContacto = localStorage.getItem('emailContacto');
  }
  borrarEmail(){
    localStorage.removeItem('emailContacto');
    localStorage.clear;
    this.emailContacto = null;
  }

}
