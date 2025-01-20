export interface Motivo {
    id: number;
    nombre: string;
  }
  
  export interface salidasType {
    id: number;
    producto: {
      id: number;
      nombre: string;
    };
    cantidad: number;
    gananciaOPerdida: number;
    fecha: string;
    motivo: Motivo;
    nota: string | null;
    usuario: string;
    valorSalida: number;
  }