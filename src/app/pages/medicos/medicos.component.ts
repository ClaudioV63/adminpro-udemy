import { MedicoService } from './../../services/medico/medico.service';
import { Medico } from './../../models/medico.model';
import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;
  desde: number = 0;

  constructor(
    public _medicosService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }


  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }


  cargarMedicos() {
    this._medicosService.cargarMedicos( this.desde )
      .subscribe( (resp: any) => {

      this.totalRegistros = resp.total;
      this.medicos = resp.medicos;
      this.cargando = false;
  });  }

  buscarMedico( termino: string ) {
    if ( termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicosService.buscarMedico( termino )
      .subscribe( (medicos: any) => {
          this.medicos = medicos;
          this.cargando = false;
      });
  }

  crearMedico() {

  }

  editarMedico( medico: Medico ) {

  }

  borrarMedico( medico: Medico ) {
    swal( {
      title: '¿Está seguro?',
      text: 'Está a punto de borra a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then ( borrar => {
      if ( borrar ) {
        this._medicosService.borrarMedico( medico._id )
                .subscribe( borrado => {
                  this.cargarMedicos();
                });
      }
    });
    }
}

