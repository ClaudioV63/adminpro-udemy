
export class Usuario {

// Hay que mantener el orden ya que el objeto a crearse deben respetarse el paso de parámetros
// let usuario = new Usuario ( par1, par2, par3 ...)
// luego del primer parametro opcionial, todos los demás deben ser opcionales o por defecto.

    constructor (
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }
}
