import axios from "axios";
import type { Heatmap, Trip, User } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api"
});

export async function registerUser(email: string, password: string, role: "usuario" | "administrador"): Promise<User> {
  const response = await api.post<User>("/users/register", { email, password, role });
  return response.data;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const response = await api.post<User>("/users/login", { email, password });
  return response.data;
}

export async function listTrips(): Promise<Trip[]> {
  const response = await api.get<Trip[]>("/trips");
  return response.data;
}

export async function createTrip(payload: {
  actor_email: string;
  title: string;
  meeting_point: string;
  start_at: string;
  transport_mode: "caminando" | "bus_universidad";
  direction: "metro_universidad" | "universidad_metro";
}): Promise<Trip> {
  const response = await api.post<Trip>("/trips", payload);
  return response.data;
}

export async function joinTrip(tripId: number, actor_email: string): Promise<Trip> {
  const response = await api.post<Trip>(`/trips/${tripId}/join`, { actor_email });
  return response.data;
}

export async function leaveTrip(tripId: number, actor_email: string): Promise<Trip> {
  const response = await api.post<Trip>(`/trips/${tripId}/leave`, { actor_email });
  return response.data;
}

export async function updateTripState(tripId: number, actor_email: string, new_state: string): Promise<Trip> {
  const response = await api.post<Trip>(`/trips/${tripId}/state`, { actor_email, new_state });
  return response.data;
}

export async function loadRealHeatmap(): Promise<Heatmap[]> {
  const response = await api.get<Heatmap[]>("/trips/metrics/heatmap");
  return response.data;
}

export async function loadSimulatedHeatmap(): Promise<Heatmap[]> {
  const response = await api.get<{ heatmaps: Heatmap[] }>("/trips/metrics/heatmap/simulated");
  return response.data.heatmaps;
}
