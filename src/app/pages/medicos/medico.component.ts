import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicoService } from './../../services/medico/medico.service';
import { Medico } from './../../models/medico.model';
import { HospitalService } from './../../services/service.index';
import { Hospital } from './../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
    ) {
      activatedRoute.params.subscribe( params => {
        const id = params['id'];

        if (id !== 'nuevo') {
          this.cargarMedico( id );
        }
      });
    }

  ngOnInit() {
    this._hospitalService.cargarHospitales( 0, true )
      .subscribe( (resp: any) => {
        this.hospitales = resp.hospitales;
      });
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
      .subscribe ( medico => {

        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      });
  }


  guardarMedico( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
      .subscribe( medico => {

        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
      });
  }

  cambioHospital( id ) {

    this._hospitalService.obtenerHospital( id )
      .subscribe( hospital => this.hospital = hospital );
  }

  cargarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );

    this._modalUploadService.notificacion
      .subscribe( resp => {
        this.medico.img = resp.medico.img;
      });
  }
 }
