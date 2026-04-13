<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import HeatmapGrid from "../components/HeatmapGrid.vue";
import { createTrip, joinTrip, leaveTrip, listTrips, loadRealHeatmap, updateTripState } from "../services/api";
import { clearUser, getUser } from "../stores/session";
import type { Heatmap, Trip } from "../types";

const router = useRouter();
const user = getUser();
const trips = ref<Trip[]>([]);
const heatmaps = ref<Heatmap[]>([]);
const message = ref("");
const intervalId = ref<number | null>(null);

const form = ref({
  title: "",
  meeting_point: "",
  start_at: "",
  transport_mode: "caminando" as "caminando" | "bus_universidad",
  direction: "metro_universidad" as "metro_universidad" | "universidad_metro"
});

const canRender = computed(() => !!user);

async function refreshData() {
  if (!user) {
    return;
  }
  trips.value = await listTrips();
  heatmaps.value = await loadRealHeatmap();
}

async function submitTrip() {
  if (!user) {
    return;
  }
  message.value = "";
  try {
    await createTrip({
      actor_email: user.email,
      title: form.value.title,
      meeting_point: form.value.meeting_point,
      start_at: new Date(form.value.start_at).toISOString(),
      transport_mode: form.value.transport_mode,
      direction: form.value.direction
    });
    message.value = "Desplazamiento creado correctamente.";
    await refreshData();
  } catch {
    message.value = "No se pudo crear el desplazamiento.";
  }
}

async function onJoin(tripId: number) {
  if (!user) return;
  await joinTrip(tripId, user.email);
  await refreshData();
}

async function onLeave(tripId: number) {
  if (!user) return;
  await leaveTrip(tripId, user.email);
  await refreshData();
}

async function onAdvanceState(trip: Trip) {
  if (!user) return;
  const transitions: Record<string, string> = {
    en_metro: "en_desplazamiento_universidad",
    en_desplazamiento_universidad: "en_universidad",
    en_universidad: "en_desplazamiento_metro",
    en_desplazamiento_metro: "en_metro"
  };
  await updateTripState(trip.id, user.email, transitions[trip.state]);
  await refreshData();
}

function logout() {
  clearUser();
  router.push("/");
}

onMounted(async () => {
  await refreshData();
  intervalId.value = window.setInterval(refreshData, 15000);
});

onBeforeUnmount(() => {
  if (intervalId.value) {
    window.clearInterval(intervalId.value);
  }
});
</script>

<template>
  <div v-if="canRender" class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h1 class="mb-0">Dashboard de desplazamientos</h1>
        <p class="text-muted mb-0">Usuario actual: {{ user?.email }} ({{ user?.role }})</p>
      </div>
      <button class="btn btn-outline-danger" @click="logout">Cerrar sesión local</button>
    </div>

    <section class="card p-4 mb-4 shadow-sm">
      <h2>Crear desplazamiento</h2>
      <form class="row g-3" @submit.prevent="submitTrip">
        <div class="col-12 col-md-6">
          <label class="form-label">Título</label>
          <input v-model="form.title" class="form-control" required minlength="3" />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label">Punto de encuentro</label>
          <input v-model="form.meeting_point" class="form-control" required minlength="3" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label">Fecha y hora</label>
          <input v-model="form.start_at" class="form-control" type="datetime-local" required />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label">Medio</label>
          <select v-model="form.transport_mode" class="form-select">
            <option value="caminando">Caminando</option>
            <option value="bus_universidad">Bus de la universidad</option>
          </select>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label">Dirección</label>
          <select v-model="form.direction" class="form-select">
            <option value="metro_universidad">Metro → Universidad</option>
            <option value="universidad_metro">Universidad → Metro</option>
          </select>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Guardar</button>
        </div>
      </form>
      <p v-if="message" class="mt-3">{{ message }}</p>
    </section>

    <section class="mb-4">
      <h2>Desplazamientos activos</h2>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Medio</th>
              <th>Estado</th>
              <th>Participantes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trip in trips" :key="trip.id">
              <td>{{ trip.title }}</td>
              <td>{{ trip.transport_mode }}</td>
              <td>{{ trip.state }}</td>
              <td>{{ trip.participants.length }}</td>
              <td class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" @click="onJoin(trip.id)">Unirme</button>
                <button class="btn btn-sm btn-outline-secondary" @click="onLeave(trip.id)">Retirarme</button>
                <button class="btn btn-sm btn-outline-primary" @click="onAdvanceState(trip)">Avanzar estado</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="d-grid gap-3">
      <HeatmapGrid
        v-for="map in heatmaps"
        :key="map.transport_mode"
        :title="map.transport_mode === 'caminando' ? 'Mapa de calor - Caminando' : 'Mapa de calor - Bus universidad'"
        :map="map"
      />
    </section>
  </div>
</template>
