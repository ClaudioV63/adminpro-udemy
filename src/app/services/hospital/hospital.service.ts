import { URL_SERVICIOS } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Hospital } from '../../models/hospital.model';
// import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  desde: number = 0;
 
  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0, todos?: boolean ) {

    if (!todos) {
      todos = false;
    }

    if ( !todos ) {
      const url = URL_SERVICIOS + '/hospital?desde=' + desde;
      return this.http.get ( url );

    } else {
        const  url = URL_SERVICIOS + '/hospital/todos';
        return this.http.get ( url );
    }
  }

  obtenerHospital( id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get ( url )
        .pipe( map ( (resp: any) => resp.hospital ));
  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
      .pipe( map( resp => {
        swal('Hospital borrado', 'El hospital ha sido borrado correctamente', 'success');
        return true;
      }) );

  }

  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital/';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, {nombre: nombre })
      .pipe( map ( (resp: any) => resp.hospital ));

  }

  buscarHospital ( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .pipe( map ( (resp: any) => resp.hospitales ));
  }

  actualizarHospital ( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital)
    .pipe( map ( (resp: any ) => {
      swal('Hospital Actualizado', 'Se actualizó correctamente el Hospital: ' + hospital.nombre, 'sucsess');
      return resp.hospital;
    } ));
  }

}
