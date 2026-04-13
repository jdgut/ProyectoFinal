export type UserRole = "usuario" | "administrador";

export type TransportMode = "caminando" | "bus_universidad";

export type TripDirection = "metro_universidad" | "universidad_metro";

export type TripState =
  | "en_metro"
  | "en_desplazamiento_universidad"
  | "en_universidad"
  | "en_desplazamiento_metro";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface TripParticipant {
  email: string;
}

export interface Trip {
  id: number;
  title: string;
  meeting_point: string;
  start_at: string;
  transport_mode: TransportMode;
  direction: TripDirection;
  state: TripState;
  is_archived: boolean;
  creator_email: string;
  participants: TripParticipant[];
}

export interface HeatmapCell {
  state: TripState;
  count: number;
}

export interface Heatmap {
  transport_mode: TransportMode;
  cells: HeatmapCell[];
}
