<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import HeatmapGrid from "../components/HeatmapGrid.vue";
import { loadSimulatedHeatmap, registerUser } from "../services/api";
import { saveUser } from "../stores/session";
import type { Heatmap } from "../types";

const router = useRouter();
const loading = ref(false);
const error = ref("");
const heatmaps = ref<Heatmap[]>([]);
const form = ref({
  email: "",
  password: "",
  role: "usuario" as "usuario" | "administrador"
});

async function loadHeatmaps() {
  heatmaps.value = await loadSimulatedHeatmap();
}

async function submit() {
  error.value = "";
  if (!form.value.email.endsWith("@eafit.edu.co")) {
    error.value = "Solo se permiten correos @eafit.edu.co";
    return;
  }

  loading.value = true;
  try {
    const user = await registerUser(form.value.email, form.value.password, form.value.role);
    saveUser(user);
    router.push("/dashboard");
  } catch {
    error.value = "No fue posible registrar el usuario.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadHeatmaps);
</script>

<template>
  <div class="container py-4">
    <header class="hero mb-4">
      <h1>Movilidad colaborativa EAFIT</h1>
      <p>Reporta y únete a desplazamientos entre metro y universidad. Sin iniciar sesión, verás datos simulados.</p>
    </header>

    <div class="row g-4">
      <div class="col-12 col-lg-5">
        <section class="card p-4 shadow-sm">
          <h2>Registro rápido</h2>
          <p class="text-muted">No hay login. El registro crea la sesión local para pruebas académicas.</p>

          <form class="d-grid gap-3" @submit.prevent="submit">
            <input v-model="form.email" class="form-control" type="email" placeholder="correo@eafit.edu.co" required />
            <input v-model="form.password" class="form-control" type="password" placeholder="Contraseña" minlength="8" required />
            <select v-model="form.role" class="form-select">
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>
            <button class="btn btn-success" :disabled="loading" type="submit">
              {{ loading ? "Registrando..." : "Entrar al dashboard" }}
            </button>
          </form>
          <p v-if="error" class="text-danger mt-2">{{ error }}</p>
        </section>
      </div>

      <div class="col-12 col-lg-7 d-grid gap-3">
        <HeatmapGrid
          v-for="map in heatmaps"
          :key="map.transport_mode"
          :title="map.transport_mode === 'caminando' ? 'Mapa de calor - Caminando (simulado)' : 'Mapa de calor - Bus (simulado)'"
          :map="map"
        />
      </div>
    </div>
  </div>
</template>
