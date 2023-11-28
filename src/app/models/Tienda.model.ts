export class Tienda {
    key?: string | null;
    title?: string;
    metros?: number = 0;
    domicilio?: string;
    pisos?: number = 0;
    cuartos?: number = 0;
    banios?: number = 0;
    published?: boolean;
  }
  export class usuario{

    key?: string | null;
    usuario?: string;
    contrasena?: string;
    su?: boolean;
    confirmNewPassword?: string;
  }