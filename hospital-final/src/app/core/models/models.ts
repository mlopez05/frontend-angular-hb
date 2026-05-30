export interface LoginRequest { usuario: string; contraseña: string; }
export interface RegistroRequest { usuario: string; nombre: string; apellido: string; contraseña: string; rol: number; }
export interface AuthResponse { token: string; id: number; requiereCambioContrasena?: boolean; }

export interface PacienteRequest {
  numeroIdentificacion: string; nombre: string; apellido: string;
  fechaNacimiento: string; direccion: string; telefono: string; email: string;
  idRecepcionista: number; idSeguro: number; contraseña: string; rol: number;
}

export interface Paciente {
  idPaciente: number; numeroIdentificacion: string; nombre: string; apellido: string;
  fechaNacimiento: string; direccion: string; telefono: string; email: string;
  fechaRegistro: string;
}

export interface Cita {
  id: number; fechaHora: string; especialidad: string;
  medicoAsignado: string; estado: string; pacienteId: number; slotId: string;
}

export interface CitasResponse { citasFuturas: Cita[]; citasPasadas: Cita[]; }

export interface SolicitarCitaRequest {
  slotId?: number | null;
  medicoId: number;
  fechaHora: string;
  especialidad: string;
  medicoAsignado: string;
  observaciones?: string;
}

export interface ReprogramarCitaRequest { nuevoSlotId: string; nuevaFechaHora: string; }
