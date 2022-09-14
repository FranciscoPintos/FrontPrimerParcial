import { Categoria } from "./categoria.interface";

export interface SubCategoria {
  idTipoProducto: number;
  descripcion: string;
  flagVisible: string;
  idCategoria: Categoria;
  posicion: number;
}
