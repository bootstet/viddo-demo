<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Application, SPEObject } from '@splinetool/runtime'

interface SplineProps {
  scene: string
  className?: string
}

const props = withDefaults(defineProps<SplineProps>(), {
  className: ''
})

const emit = defineEmits<{
  load: [spline: Application]
  mousedown: [event: { target: SPEObject }]
  mouseup: [event: { target: SPEObject }]
  mousehover: [event: { target: SPEObject }]
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
const container = ref<HTMLDivElement | null>(null)
let spline: Application | null = null
let resizeObserver: ResizeObserver | null = null

const loadSpline = async () => {
  if (!canvas.value || !container.value) return

  try {
    // 设置 canvas 初始尺寸
    const rect = container.value.getBoundingClientRect()
    canvas.value.width = rect.width
    canvas.value.height = rect.height

    spline = new Application(canvas.value)
    
    // 添加事件监听
    spline.addEventListener('mousedown', (e: any) => {
      emit('mousedown', e)
    })
    
    spline.addEventListener('mouseup', (e: any) => {
      emit('mouseup', e)
    })
    
    spline.addEventListener('mousehover', (e: any) => {
      emit('mousehover', e)
    })
    
    await spline.load(props.scene)
    emit('load', spline)
  } catch (error) {
    console.error('Failed to load Spline scene:', error)
  }
}

const handleResize = () => {
  if (canvas.value && container.value) {
    const rect = container.value.getBoundingClientRect()
    canvas.value.width = rect.width
    canvas.value.height = rect.height
    
    if (spline) {
      spline.setSize(rect.width, rect.height)
    }
  }
}

onMounted(async () => {
  await loadSpline()
  
  // 自动调整大小
  if (container.value) {
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  
  if (spline) {
    spline.dispose()
    spline = null
  }
})

// 监听 scene 变化
watch(() => props.scene, () => {
  if (spline) {
    spline.dispose()
  }
  loadSpline()
})
</script>

<template>
  <div ref="container" :class="['spline-container-wrapper', className]">
    <canvas ref="canvas" class="spline-canvas"></canvas>
  </div>
</template>

<style scoped>
.spline-container-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
}

.spline-canvas {
  width: 100%;
  height: 100%;
  display: block;
  outline: none;
}
</style>
