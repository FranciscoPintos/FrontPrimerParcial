import {FichaClinica} from "./ficha_clinica.inteface";


export class ServicioInterface {
  idServicio!: number;
  fechaHora!: string;
  presupuesto!: number;
  idFichaClinica!: FichaClinica;
  observacion!: string;
}

/*export class ServicioPostBody {
  idFichaClinica!: Partial<FichaClinica>;
  observacion!: string;
}

export class Detalles{
  idServicioDetalle!: number;
  idPresentacionProducto!: PresentacionProducto;
  idServicio!: ServicioInterface;
}

export class DetallePostBody {
  cantidad!: number;
  idPresentacionProducto!: Partial<PresentacionProducto>;
  idServicio!: Partial<ServicioInterface>;
}*/
