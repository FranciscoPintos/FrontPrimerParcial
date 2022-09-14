import { PresentacionProducto } from "./presentacionProducto";
import { Ficha } from "./ficha";


export class Servicio {
  idServicio!: number;
  fechaHora!: string;
  presupuesto!: number;
  idFichaClinica!: Ficha;
  observacion!: string;
}

export class ServicioPostBody {
  idFichaClinica!: Partial<Ficha>;
  observacion!: string;
}

export class Detalles{
  idServicioDetalle!: number;
  idPresentacionProducto!: PresentacionProducto;
  idServicio!: Servicio;
}

export class DetallePostBody {
  cantidad!: number;
  idPresentacionProducto!: Partial<PresentacionProducto>;
  idServicio!: Partial<Servicio>;
}
