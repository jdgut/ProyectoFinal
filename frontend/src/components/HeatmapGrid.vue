<script setup lang="ts">
import { computed } from "vue";
import type { Heatmap } from "../types";

const props = defineProps<{
  title: string;
  map: Heatmap;
}>();

function color(count: number): string {
  if (count === 0) return "#F0F4FF";
  if (count <= 2) return "#C7E0FF";
  if (count <= 5) return "#5BA3FF";
  return "#003DA5";
}

const prettyState = computed(() => ({
  en_metro: "En el metro",
  en_desplazamiento_universidad: "En desplazamiento a la Universidad",
  en_universidad: "En la Universidad",
  en_desplazamiento_metro: "En desplazamiento al metro"
}));
</script>

<template>
  <section class="heatmap-card">
    <h3>{{ title }}</h3>
    <div class="heatmap-grid">
      <article v-for="cell in map.cells" :key="cell.state" class="heat-cell" :style="{ backgroundColor: color(cell.count) }">
        <p class="state">{{ prettyState[cell.state] }}</p>
        <p class="value">{{ cell.count }} grupos</p>
      </article>
    </div>
  </section>
</template>
