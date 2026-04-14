<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import HeatmapGrid from "../components/HeatmapGrid.vue";
import { loadSimulatedHeatmap, loginUser, registerUser } from "../services/api";
import { saveUser } from "../stores/session";
import type { Heatmap } from "../types";

const router = useRouter();
const loading = ref(false);
const error = ref("");
const heatmaps = ref<Heatmap[]>([]);
const showRegisterForm = ref(false);
const authMode = ref<"login" | "register">("register");
const form = ref({
  email: "",
  password: "",
  role: "usuario" as "usuario" | "administrador"
});

async function loadHeatmaps() {
  try {
    heatmaps.value = await loadSimulatedHeatmap();
  } catch {
    console.error("Error cargando mapas de calor simulados");
  }
}

async function submit() {
  error.value = "";
  if (!form.value.email.endsWith("@eafit.edu.co")) {
    error.value = "Solo se permiten correos @eafit.edu.co";
    return;
  }

  if (form.value.password.length < 8) {
    error.value = "La contraseña debe tener al menos 8 caracteres";
    return;
  }

  loading.value = true;
  try {
    const user =
      authMode.value === "register"
        ? await registerUser(form.value.email, form.value.password, form.value.role)
        : await loginUser(form.value.email, form.value.password);
    saveUser(user);
    router.push("/dashboard");
  } catch {
    error.value =
      authMode.value === "register"
        ? "No fue posible registrar el usuario. Verifica que el correo sea único."
        : "No fue posible iniciar sesión. Verifica correo y contraseña.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadHeatmaps);
</script>

<template>
  <div class="home-container">
    <!-- Sección Hero -->
    <section class="hero-section">
      <div class="container">
        <header class="hero">
          <h1>Movilidad colaborativa EAFIT</h1>
          <p class="hero-subtitle">Coordina desplazamientos entre metro y universidad de manera inteligente y transparente</p>
        </header>
      </div>
    </section>

    <!-- Sección de descripción y características -->
    <section class="features-section">
      <div class="container py-5">
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-3">
            <div class="info-card">
              <h4>📍 Reporta desplazamientos</h4>
              <p>Crea nuevos desplazamientos especificando ruta, horario y punto de encuentro para coordinar traslados con otros estudiantes.</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <div class="info-card">
              <h4>👥 Únete a grupos</h4>
              <p>Visualiza desplazamientos activos y únete a los que se adapten a tu horario y ruta preferenciales.</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <div class="info-card">
              <h4>📊 Estadísticas en tiempo real</h4>
              <p>Consulta mapas de calor que muestran la concentración de usuarios en cada etapa del desplazamiento.</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <div class="info-card">
              <h4>🔒 Seguro y auditado</h4>
              <p>Todos los movimientos se registran en auditoría para garantizar transparencia y trazabilidad en los desplazamientos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de gráficos simulados y acceso -->
    <section class="heatmap-section">
      <div class="container py-5">
        <div class="section-header mb-5">
          <h2>Vista previa: Gráficos de actualidad</h2>
          <p class="text-muted">Datos simulados para demostración. Registrate para acceder a datos reales y participar en desplazamientos.</p>
        </div>

        <div class="row g-4 mb-5">
          <div class="col-12 col-lg-8">
            <div class="d-grid gap-3">
              <HeatmapGrid
                v-for="map in heatmaps"
                :key="map.transport_mode"
                :title="map.transport_mode === 'caminando' ? 'Distribución - Desplazamientos a pie' : 'Distribución - Desplazamientos en bus'"
                :map="map"
              />
            </div>
          </div>

          <div class="col-12 col-lg-4">
            <div class="card h-100">
              <div class="card-header">
                <h5 class="mb-0">{{ showRegisterForm ? (authMode === "register" ? "Crear cuenta" : "Iniciar sesión") : "Acceso a dashboard" }}</h5>
              </div>
              <div class="card-body d-flex flex-column">
                <p class="text-muted mb-3" v-if="!showRegisterForm">
                  Inicia sesión con tu cuenta existente o regístrate para acceder al dashboard completo y gestionar desplazamientos.
                </p>

                <form v-if="showRegisterForm" class="d-grid gap-3" @submit.prevent="submit">
                  <div class="d-flex gap-2">
                    <button
                      type="button"
                      class="btn btn-sm"
                      :class="authMode === 'login' ? 'btn-primary' : 'btn-outline-primary'"
                      @click="authMode = 'login'"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm"
                      :class="authMode === 'register' ? 'btn-primary' : 'btn-outline-primary'"
                      @click="authMode = 'register'"
                    >
                      Registrarse
                    </button>
                  </div>

                  <div>
                    <label class="form-label">Correo EAFIT</label>
                    <input v-model="form.email" class="form-control" type="email" placeholder="tu.email@eafit.edu.co" required />
                  </div>

                  <div>
                    <label class="form-label">Contraseña</label>
                    <input v-model="form.password" class="form-control" type="password" placeholder="Mínimo 8 caracteres" minlength="8" required />
                  </div>

                  <div v-if="authMode === 'register'">
                    <label class="form-label">Rol de acceso</label>
                    <select v-model="form.role" class="form-select">
                      <option value="usuario">Estudiante/Usuario</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  </div>

                  <button class="btn btn-primary" :disabled="loading" type="submit">
                    {{ loading ? (authMode === "register" ? "Registrando..." : "Ingresando...") : (authMode === "register" ? "Crear cuenta" : "Iniciar sesión") }}
                  </button>

                  <button type="button" class="btn btn-outline-secondary" @click="showRegisterForm = false">
                    Cancelar
                  </button>

                  <p v-if="error" class="text-danger mb-0 small">{{ error }}</p>
                </form>

                <button v-else class="btn btn-primary btn-lg mt-auto" @click="showRegisterForm = true">
                  Acceder ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de instrucciones -->
    <section class="instructions-section">
      <div class="container py-5">
        <h2 class="mb-4">¿Cómo usar la plataforma?</h2>
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-3">
            <div class="step-card">
              <div class="step-number">1</div>
              <h5>Registrate</h5>
              <p>Crea una cuenta con tu correo institucional @eafit.edu.co sin necesidad de validación externa.</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <div class="step-card">
              <div class="step-number">2</div>
              <h5>Crea o únete</h5>
              <p>Inicia un nuevo desplazamiento o únete a uno existente que coincida con tu horario.</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <div class="step-card">
              <div class="step-number">3</div>
              <h5>Coordina</h5>
              <p>Avanza por los estados de desplazamiento conforme sucedan los traslados en tiempo real.</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <div class="step-card">
              <div class="step-number">4</div>
              <h5>Visualiza datos</h5>
              <p>Consulta gráficos en vivo de dónde están ubicados los grupos en cada momento del traslado.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-tertiary) 100%);
  padding: 3rem 0;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 0 !important;
}

.features-section {
  background: #FAFBFF;
}

.info-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 4px solid var(--brand-primary);
}

.heatmap-section {
  background: #FFFFFF;
}

.section-header {
  text-align: center;
}

.section-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card {
  display: flex;
  flex-direction: column;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.step-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.8rem;
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 61, 165, 0.12);
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-tertiary));
  color: #FFFFFF;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.step-card h5 {
  color: var(--brand-primary);
  margin-bottom: 0.75rem;
}

.instructions-section {
  background: #F8FAFF;
}
</style>
