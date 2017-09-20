import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-guardar-email',
  templateUrl: './guardar-email.component.html',
  styleUrls: ['./guardar-email.component.css']
})
export class GuardarEmailComponent implements OnInit,DoCheck {
  public title:string;
  public emailContacto:string;
  constructor() { }

  ngOnInit() {
    this.title = 'Email Contacto';
    // this.emailContacto = localStorage.getItem('emailContacto');
  }
  ngDoCheck(){
    // this.emailContacto = localStorage.getItem('emailContacto');
  }
  guardarEmail(){
    localStorage.setItem('emailContacto',this.emailContacto)
  }

}
