import { Hospital } from './../../models/hospital.model';
import { Medico } from './../../models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public actcivatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    actcivatedRoute.params
      .subscribe( params => {
      const termino = params['termino'];
      this.buscar( termino );
    });
 }

 buscar( termino: string) {

  const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
  this.http.get( url )
    .subscribe( (resp: any) => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
    });
 }

  ngOnInit() {
  }

}
