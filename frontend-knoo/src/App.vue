<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loader from '@/components/Loader.vue'
import { useProfile } from './composables/useProfile'
import { onMounted, onBeforeUnmount, computed } from 'vue';
import { initializeWebSocket } from './wss';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { ILesson } from './store/module/interface/lesson.interface';

const {
  isLoading
} = useProfile()

const store = useStore()
const router = useRouter()

// Verifica se há lições em progresso
const hasLessonsInProgress = computed(() => {
  const lessons = store.getters['area_module/lessons'] || []
  return lessons.some((lesson: ILesson) => lesson.is_in_progress)
})

// Alerta apenas quando usuário tenta recarregar a página ou fechar a janela
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (hasLessonsInProgress.value) {
    const message = 'Há aulas em progresso que serão perdidas. Deseja realmente sair?'
    e.returnValue = message
    return message
  }
}

onMounted(() => {
  initializeWebSocket()
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<template>
  <div class="app">
    <Loader v-if="isLoading" />
    <RouterView v-else />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 14px;
  justify-content: center;
  align-items: center;
}

@media only screen 
  and (min-width: 200px)
  and (max-width: 1300px) {
    .app {
        overflow-y: scroll;
        padding: 0;
    }
}
</style>
