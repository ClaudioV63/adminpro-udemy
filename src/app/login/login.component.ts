import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// Google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  // Google
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins() ;

    // Google
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  // Google
  googleInit() {
    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init( {
        client_id: '960427517448-dqk8gtmsqalgi05sordj44ktbit1pcgq.apps.googleusercontent.com',
        cookiepolicy: 'single-host-origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  // Google
  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
    // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token )
            .subscribe ( () => window.location.href = '#/dashboard');
    });
  }


  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this. _usuarioService.login( usuario, forma.value.recuerdame )
          .subscribe( ok => this.router.navigate(['/dashboard']) );

  }
}
