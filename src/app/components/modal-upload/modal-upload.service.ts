import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';  // modal oculto por defecto

  public notificacion = new EventEmitter<any>();

  constructor() {
    // console.log('Modal Upload Funciona');
   }

   ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
   }

   mostrarModal( tipo: string, id: string ) {
      this.oculto = '';
      this.id = id;
      this.tipo = tipo;
   }
}
