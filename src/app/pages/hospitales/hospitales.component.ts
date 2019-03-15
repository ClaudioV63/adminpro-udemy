import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Hospital } from './../../models/hospital.model';
import { HospitalService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = false;
  totalRegistros: number = 0;
  desde: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarHospitales());
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
    this.cargarHospitales();
  }

  cargarHospitales( ) {
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
        .subscribe( (resp: any) => {

            this.totalRegistros = resp.total;
            this.hospitales = resp.hospitales;
            this.cargando = false;
        });
  }

  borrarHospital ( hospital ) {

    swal( {
      title: '¿Está seguro?',
      text: 'Está a punto de borra a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then ( borrar => {
      if ( borrar ) {
        this._hospitalService.borrarHospital( hospital._id )
                .subscribe( borrado => {
                  this.cargarHospitales();
                });
      }
    });
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
        .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.cargando = false;
        });
  }

  guardarHospital( hospital ) {
    this._hospitalService.actualizarHospital( hospital )
      .subscribe( () => this.cargarHospitales());
  }


  crearHospital () {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
      .then( (valor: string) => {
      if ( !valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital( valor ).subscribe( () => {
        this.cargarHospitales();
      })
    });
  }

  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }
}
