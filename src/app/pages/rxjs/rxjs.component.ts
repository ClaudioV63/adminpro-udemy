import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObservable().subscribe(
      (numero) => console.log('Subs: ', numero),
      (error) => console.log('Error en el Obs: ', error),
      () => console.log('El Obs terminó')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3) {
        //  clearInterval( intervalo );
        //  observer.complete();
        // } // else {
        //  if (contador === 2 ) {
        //    clearInterval( intervalo );
        //    observer.error('Auxilio');
        //  }
        // }

      }, 1000 );
    }).pipe(
      map ( resp => resp.valor ),
      filter ( (valor, index) => {

        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }

      })
      );
  }
}