import type { User } from "../types";

const STORAGE_KEY = "movilidad_session_user";

export function saveUser(user: User): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function clearUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}
