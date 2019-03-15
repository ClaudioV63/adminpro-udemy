import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
  ) {}
  canActivate() {

if (this._usuarioService.usuario.role === 'ADMIN_ROLE' ) {
  return true;
} else {
  console.log('Bloqueado role por ADMIN GUARD');
  this._usuarioService.logout();
  return false;
}
  }
}
