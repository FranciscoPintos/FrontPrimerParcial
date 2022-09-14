export interface FichaClinica {
  idFichaClinica: number;
  fechaHora: Date;
  motivoConsulta: string;
  diagnostico: string;
  observacion: string;
  idLocal: IDLocal;
  idEmpleado: ID;
  idCliente: ID;
  idTipoProducto: IDTipoProducto;
  fechaHoraCadena: string;
  fechaHoraCadenaFormateada: string;
  fechaDesdeCadena: null;
  fechaHastaCadena: null;
  todosLosCampos: null;
}

export interface ID {
  idPersona: number;
  nombre: string;
  apellido: string;
  email: null | string;
  telefono: null | string;
  seguroMedico: null;
  seguroMedicoNumero: null;
  ruc: null | string;
  cedula: null | string;
  tipoPersona: string;
  usuarioLogin: null;
  idLocalDefecto: null;
  flagVendedor: string;
  flagTaxfree: null;
  flagExcepcionChequeoVenta: null;
  observacion: null;
  direccion: null;
  idCiudad: null;
  tipoCliente: string;
  fechaHoraAprobContrato: null;
  soloUsuariosDelSistema: null;
  soloPersonasTaxfree: null;
  nombreCompleto: string;
  limiteCredito: number;
  fechaNacimiento: Date | null;
  soloProximosCumpleanhos: null;
  todosLosCampos: null;
  incluirLimiteDeCredito: null;
  deuda: null;
  saldo: null;
  creditos: null;
}

export interface IDLocal {
  idLocal: number;
  nombre: string;
  flagCasaCentral: string;
  cantidadIngreso: number;
  anhoMesActual: string;
  fechaHoraUltimoIngreso: Date;
  minutosSesion: number;
  nombreEmpresa: null;
  urlImagen: null;
  secuencia: null;
  pin: null;
  appMovil: null;
  qr: null;
  qrSoloEvaluacion: null;
  moneda: null;
  evaluacionItem: null;
  evaluacionLocal: null;
  habilitarFacebook: null;
  habilitarDatosManualmente: null;
  habilitarAnonimo: null;
  mostrarPreciosEnAccesoPublico: null;
  habilitarReserva: null;
  habilitarPedidosEnLocal: null;
  habilitarPedidosParaLlevar: null;
  habilitarPedidosDelivery: null;
  habilitarLlamarAlMozo: null;
  textoLamarAlMozo: null;
  textoRealizarPedido: null;
  recurso: null;
  flagRequiereAutorizacion: null;
  solicitarRucEnPedidos: null;
  costoDelivery: null;
  radioCoberturaDelivery: null;
  tiempoEntregaDelivery: null;
  posicionMapa: null;
  horaApertura: null;
  horaCierre: null;
  horariosEntregas: null;
  ultimaPublicacionShowMoreWeb: null;
}

export interface IDTipoProducto {
  idTipoProducto: number;
  descripcion: string;
  flagVisible: string;
  idCategoria: IDCategoria;
  posicion: number;
}

export interface IDCategoria {
  idCategoria: number;
  descripcion: string;
  flagVisible: string;
  posicion: number;
}
