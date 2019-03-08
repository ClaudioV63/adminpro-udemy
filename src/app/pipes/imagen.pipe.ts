import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';  // regresará la imagen "Sin Imagen"
    }
    if ( img.indexOf('https') >= 0 ) {  // es una imagen de perfil Google
      return img;                       // retornamos el mismo url de google
                                        // sin ninguna transformación
    }
    switch ( tipo ) {
      case 'usuario':
          url += '/usuarios/' + img;
      break;
      case 'medico':
        url += '/medicos/' + img;
      break;
      case 'hospital':
        url += '/hospitales/' + img;
      break;
      default:
        console.log('Tipo de imagen no existe. Solo tipos: usuario, medico, hospital');
        url += '/usuarios/xxx';
    }
    return url;
  }
}
