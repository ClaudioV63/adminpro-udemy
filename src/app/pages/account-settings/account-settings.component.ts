import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService ) { }

   ngOnInit() {
     this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck (link);

    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck (link: any ) {

      const selectores: any = document.getElementsByClassName('selector');     // Uso directamente Vanilla javascript (javascript puro)

      for ( const ref of selectores ) {

        ref.classList.remove('working');    // Remuevo cada clase 'working' que pudiera tener cada elemento 'li'
      }

      link.classList.add('working');      // Le agrego la clase 'working' (es el tilde) al elemento (link) seleccionado
  }

  colocarCheck() {

    const selectores: any = document.getElementsByClassName('selector');

    const tema = this._ajustes.ajustes.tema;

    for ( const ref of selectores ) {

     ref.classList.remove('working');

     if ( ref.getAttribute('data-theme') === tema ) {

        ref.classList.add('working');
        break;

     }
    }

  }
}
