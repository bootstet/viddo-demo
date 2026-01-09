<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(0)
const cursorY = ref(0)
const targetX = ref(0)
const targetY = ref(0)

let animationFrameId: number

const handleMouseMove = (e: MouseEvent) => {
  targetX.value = e.clientX
  targetY.value = e.clientY
}

const animate = () => {
  cursorX.value += (targetX.value - cursorX.value) * 0.15
  cursorY.value += (targetY.value - cursorY.value) * 0.15
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div
    class="fluid-cursor"
    :style="{
      left: `${cursorX}px`,
      top: `${cursorY}px`
    }"
  >
    <div class="cursor-dot"></div>
    <div class="cursor-outline"></div>
  </div>
</template>

<style scoped>
.fluid-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px var(--primary);
}

.cursor-outline {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
  box-shadow: 0 0 30px rgba(115, 97, 222, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}
</style>
