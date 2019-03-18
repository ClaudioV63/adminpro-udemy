import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class VerificatokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
   ) {}

  canActivate(): Promise<boolean> | boolean {

    const token = this._usuarioService.token;

    // recuperar fecha de vencimiento del token
    // atob decodifica una cadena que ha sido codificada en base64
    const payload = JSON.parse( atob( token.split('.')[1] ));
    const expirado = this.expirado( payload.exp );

    // si token expirado, devuelve canActivate false > me saca de la app
    if ( expirado ) {
      this.router.navigate(['/login']);
      return false; // devolvemos el booleano en canActivate
    }

    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number): Promise<boolean> {

    return new Promise( (resolve, reject ) => {

      const  tokenExp = new Date( fechaExp * 1000 );
      const ahora = new Date();

      ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000 )); // inclremento en 4 horas la actual

      // Si la fecha de expiración es mayor que la seteada en ahora + xxx
      // no renueva token. Si es menor, sí lo renueva
      console.log('token Exp: ', tokenExp );
      console.log('ahora + 4: ', ahora );

      if ( tokenExp.getTime() > ahora.getTime()) {
        resolve (true);
      } else {
        this._usuarioService.renuevaToken()
            .subscribe ( () => {
              resolve(true);
            }, () => {
              reject(false);
            });
      }
    });
  }

  expirado( fechaExp: number ) {
  const ahora = new Date().getTime() / 1000;  // de milisegundos a segundos

  if (fechaExp < ahora ) {
    return true;
  } else {
    return false;
  }

  }
}
