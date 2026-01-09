<script setup lang="ts">
import SplineViewer from './SplineViewer.vue'

interface SplineProps {
  scene: string
  class?: string
}

defineProps<SplineProps>()
</script>

<template>
  <SplineViewer :scene="scene" :class-name="class" />
</template>
