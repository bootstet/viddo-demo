<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Spline from './components/Spline.vue'
import { FluidCursor } from './components/ui/fluid-cursor'
import SleekLineCursor from './components/ui/sleek-line-cursor/SleekLineCursor.vue'

const theme = ref(localStorage.getItem('theme') || 'purple')
const layout = ref(localStorage.getItem('layout') || 'default')
const promoVisible = ref(true)
const themeDropdownOpen = ref(false)
const layoutDropdownOpen = ref(false)
const cursorDropdownOpen = ref(false)
const scrolled = ref(false)
const cursorStyle = ref(localStorage.getItem('cursor') || 'default')

const stats = ref([
  { number: 0, target: 1.5, label: 'M+ Users', animated: false },
  { number: 0, target: 70, label: '+ Countries', animated: false },
  { number: 0, target: 20, label: '+ AI Models', animated: false },
  { number: 0, target: 100, label: '+ AI Effects', animated: false }
])

const themes = [
  { id: 'purple', name: 'Purple-Pink', gradient: 'linear-gradient(135deg, #AF4995, #7361DE)' },
  { id: 'blue', name: 'Blue-Cyan', gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)' },
  { id: 'green', name: 'Green-Emerald', gradient: 'linear-gradient(135deg, #059669, #10B981)' },
  { id: 'orange', name: 'Orange-Red', gradient: 'linear-gradient(135deg, #EF4444, #F97316)' },
  { id: 'pink', name: 'Pink-Rose', gradient: 'linear-gradient(135deg, #F43F5E, #EC4899)' },
  { id: 'deevid', name: 'DeeVid Blue', gradient: 'linear-gradient(135deg, #0047FF, #00CFFF, #00FFD1)' }
]

const layouts = [
  { id: 'default', name: 'Classic' },
  { id: 'compact', name: 'Split' },
  { id: 'wide', name: 'Wide' },
  { id: 'minimal', name: 'Simple' },
  { id: 'deevid', name: 'DeeVid' }
]

const cursors = [
  { id: 'default', name: 'Default' },
  { id: 'fluid', name: 'Fluid Cursor' },
  { id: 'trail', name: 'Trail Cursor' }
]

const changeTheme = (newTheme: string) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
  document.body.setAttribute('data-theme', newTheme)
  themeDropdownOpen.value = false
}

const changeLayout = (newLayout: string) => {
  layout.value = newLayout
  localStorage.setItem('layout', newLayout)
  document.body.setAttribute('data-layout', newLayout)
  layoutDropdownOpen.value = false
}

const changeCursor = (newCursor: string) => {
  cursorStyle.value = newCursor
  localStorage.setItem('cursor', newCursor)
  cursorDropdownOpen.value = false
  
  if (newCursor !== 'default') {
    document.body.style.cursor = 'none'
  } else {
    document.body.style.cursor = 'auto'
  }
}

const closePromo = () => {
  promoVisible.value = false
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 100
}

const animateCounter = (index: number) => {
  if (stats.value[index].animated) return
  stats.value[index].animated = true
  
  const target = stats.value[index].target
  const duration = 2000
  const increment = target / (duration / 16)
  
  const timer = setInterval(() => {
    stats.value[index].number += increment
    if (stats.value[index].number >= target) {
      stats.value[index].number = target
      clearInterval(timer)
    }
  }, 16)
}

const observeStats = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.value.forEach((_, index) => animateCounter(index))
      }
    })
  }, { threshold: 0.5 })
  
  const statsSection = document.querySelector('.stats')
  if (statsSection) observer.observe(statsSection)
}

onMounted(() => {
  document.body.setAttribute('data-theme', theme.value)
  document.body.setAttribute('data-layout', layout.value)
  window.addEventListener('scroll', handleScroll)
  setTimeout(observeStats, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <!-- Custom Cursors -->
    <FluidCursor v-if="cursorStyle === 'fluid'" />
    <SleekLineCursor v-if="cursorStyle === 'trail'" />
    <!-- Promotion Banner -->
    <div v-if="promoVisible" class="promo-banner">
      <div class="promo-content">
        <span class="promo-label">💥 The Unbeatable Lowest Price</span>
        <p class="promo-text">
          <span class="promo-model">Veo3</span>: As low as 
          <span class="promo-price">$0.86</span> per video
        </p>
        <p class="promo-text">
          <span class="promo-model">Veo3.1</span>: As low as 
          <span class="promo-price">$1.03</span> per video
        </p>
      </div>
      <button class="promo-close" @click="closePromo" aria-label="Close promotion">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="promo-close-icon">
          <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="navbar" :class="{ 'promo-closed': !promoVisible, 'scrolled': scrolled }">
      <div class="container">
        <div class="nav-content">
          <div class="logo">
            <h1>Viddo AI</h1>
          </div>
          <ul class="nav-menu">
            <li><a href="#video">AI Video</a></li>
            <li><a href="#image">AI Image</a></li>
            <li><a href="#effects">AI Effects</a></li>
            <li><a href="#voice">AI Voice</a></li>
            <li><a href="#pricing">Price</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
          <div class="nav-actions">
            <!-- Cursor Selector -->
            <div class="cursor-selector">
              <button class="btn-cursor" @click="cursorDropdownOpen = !cursorDropdownOpen">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cursor-icon">
                  <path d="M6.5 2L3 21.5L11.5 14L17.5 22L21 19.5L15 11.5L23 3L6.5 2Z" />
                </svg>
              </button>
              <div class="cursor-dropdown" :class="{ show: cursorDropdownOpen }">
                <div 
                  v-for="c in cursors" 
                  :key="c.id"
                  class="cursor-option" 
                  :class="{ active: cursorStyle === c.id }"
                  @click="changeCursor(c.id)"
                >
                  <span class="cursor-name">{{ c.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Layout Selector -->
            <div class="layout-selector">
              <button class="btn-layout" @click="layoutDropdownOpen = !layoutDropdownOpen">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="layout-icon">
                  <path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
                </svg>
              </button>
              <div class="layout-dropdown" :class="{ show: layoutDropdownOpen }">
                <div 
                  v-for="l in layouts" 
                  :key="l.id"
                  class="layout-option" 
                  :class="{ active: layout === l.id }"
                  @click="changeLayout(l.id)"
                >
                  <span class="layout-name">{{ l.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Theme Selector -->
            <div class="theme-selector">
              <button class="btn-theme" @click="themeDropdownOpen = !themeDropdownOpen">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="theme-icon">
                  <path d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" stroke="currentColor" stroke-width="1.5" fill="none" />
                </svg>
              </button>
              <div class="theme-dropdown" :class="{ show: themeDropdownOpen }">
                <div 
                  v-for="t in themes" 
                  :key="t.id"
                  class="theme-option" 
                  :class="{ active: theme === t.id }"
                  @click="changeTheme(t.id)"
                >
                  <div class="theme-preview">
                    <span class="color-dot" :style="{ background: t.gradient }"></span>
                  </div>
                  <span class="theme-name">{{ t.name }}</span>
                </div>
              </div>
            </div>
            
            <button class="btn-signin">Sign In</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" :class="{ 'promo-closed': !promoVisible }">
      <div class="hero-background">
        <video autoplay muted loop playsinline class="hero-video">
          <source src="https://cdn.viddo.ai/video/homeScreen01.webm" type="video/webm">
        </video>
        <div class="hero-overlay"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title fade-in-up">
            All-in-one AI Video & Image Generator
          </h1>
          <p class="hero-subtitle fade-in-up delay-1">
            Sora 2 Pro | Veo3.1 | Nano Banana Pro | Hailuo 2.3 | Seedance | Runway | Kling | Midjourney | GPT 4o
          </p>
          <div class="hero-badge fade-in-up delay-2">
            <span class="badge-new">New</span>
            <span>Newly Launched: Create Unlimited-Length Videos</span>
            <a href="#" class="badge-link">Try Now</a>
          </div>
          <div class="hero-buttons fade-in-up delay-3">
            <button class="btn-primary btn-large">Create Video</button>
            <button class="btn-secondary btn-large">Create Image</button>
          </div>
          <p class="hero-description fade-in-up delay-4">
            Create stunning AI-generated videos with Veo3, Runway, Kling, and Hailuo etc. Turn text or image into high-quality videos using powerful generative AI.
          </p>
        </div>
      </div>
      
      <!-- Model Carousel -->
      <div class="model-carousel">
        <div class="carousel-track">
          <template v-for="i in 2" :key="i">
            <div class="model-card" v-for="model in ['Sora 2 Pro', 'Storyboard', 'Sora 2 & Sora 2 Pro', 'Google Veo 3', 'Google Veo 3.1', 'Google Veo 3.1 Fast', 'Runway Gen-4', 'Seedance V1.5 Pro', 'Hailuo 2.3', 'Wan 2.6', 'Kling V2.6', 'Nano Banana Pro', 'GPT 4o', 'Flux 2', 'Midjourney']" :key="model + i">
              {{ model }}
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">AI Video & Image Generator With Viddo AI</h2>
        <p class="section-subtitle">Experience stunning examples of Image-to-Video, Text-to-Video, Video-to-Video, Text-to-Image, and Image-to-Image.</p>
        
        <div class="features-grid">
          <div class="feature-card" v-for="feature in [
            { icon: '🎬', title: 'Image to Video', desc: 'Turn any image into a dynamic video with AI. Animate photos, create motion from stills, and bring visuals to life in seconds.' },
            { icon: '✍️', title: 'Text to Video', desc: 'Turn words into creative videos. Simply enter a prompt and watch your ideas transform into captivating videos.' },
            { icon: '🖼️', title: 'Image to Image', desc: 'Remix and reimagine any image. Transform visuals, change styles, and generate artistic variations with ease.' },
            { icon: '🎨', title: 'Text to Image', desc: 'Create visuals from words. Describe what you want and let Viddo AI create stunning artwork and illustrations.' }
          ]" :key="feature.title">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
            <button class="btn-primary">Create</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="why-choose">
      <div class="container">
        <h2 class="section-title">Why Choose Viddo AI</h2>
        <p class="section-subtitle">Viddo AI integrates leading generative models to empower creators with a unified platform for both visuals and audio.</p>
        
        <div class="benefits-grid">
          <div class="benefit-card" v-for="benefit in [
            { num: '01', title: 'Unified Platform for Video and Music Creation', desc: 'From AI video generation to AI music composition, Viddo AI provides a complete toolkit tailored for storytellers, marketers, and creators across media.' },
            { num: '02', title: 'Powered by Leading AI Models', desc: 'Access the best of Veo 3, Runway, PixVerse, Midjourney, and Suno - all seamlessly integrated for maximum creative flexibility.' },
            { num: '03', title: 'Effortless Text-to-Content Workflows', desc: 'Turn prompts into professional content with ease. Whether it\'s text to video or text to song, Viddo AI simplifies the process.' },
            { num: '04', title: 'Built for Modern Creative Workflows', desc: 'Creating for social media, advertising, storytelling, or music production - Viddo adapts to your goals with powerful solutions.' }
          ]" :key="benefit.num">
            <div class="benefit-number">{{ benefit.num }}</div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Spline 3D Section -->
    <section class="spline-section">
      <div class="container">
        <h2 class="section-title">Experience AI in 3D</h2>
        <p class="section-subtitle">Explore our interactive 3D visualization</p>
        <div class="spline-container">
          <Spline
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            @load="() => console.log('Spline loaded successfully!')"
          />
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div v-for="(stat, index) in stats" :key="index" class="stat-item scroll-count" :class="{ animated: stat.animated }">
            <div class="stat-number">{{ stat.number.toFixed(1) }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Unlock the Full Power of Viddo AI Premium</h2>
          <p>Enjoy high-speed rendering, priority access to Veo3, Runway, PixVerse, Midjourney, and more AI Models, along with extended video and image generation.</p>
          <button class="btn-primary btn-large">Get Premium</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Viddo AI</h3>
            <p>All-in-one AI video and image generation platform</p>
          </div>
          <div class="footer-section">
            <h4>AI Video</h4>
            <ul>
              <li><a href="#">Sora 2</a></li>
              <li><a href="#">Veo3</a></li>
              <li><a href="#">Runway Gen-4</a></li>
              <li><a href="#">Hailuo 2.3</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>AI Image</h4>
            <ul>
              <li><a href="#">Midjourney</a></li>
              <li><a href="#">GPT 4o</a></li>
              <li><a href="#">Flux 2</a></li>
              <li><a href="#">Nano Banana Pro</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 viddo.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
