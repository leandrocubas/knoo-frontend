<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()
const title = ref(route.name)
const header = computed(() => store.getters['page/header'])

const goBack = (): void => {
    router.replace(route.meta.parent as string)
}

watch(
  () => route.name,
  async name => {
    if (route.meta.dynamic) {
        title.value = header.value.title || name
        return
    }

    title.value = name
  }
)

watch(
  () => header.value.title,
  async name => {
    if (route.meta.dynamic) {
        title.value = name || route.name 
        return
    }

    title.value = route.name
  }
)

</script>

<template>
    <div class="page-title">
        <ArrowLeftIcon
            @click="goBack"
            v-if="route.meta.parent"
            class="arrow-icon" 
        />

        {{ title }}
    </div>
</template>

<style lang="scss" scoped>
.page-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: var(--font-family-bold);
    font-weight: initial;

    .arrow-icon {
        margin-right: 12px;
        width: 23px;
        color: var(--color-primary);
        cursor: pointer;
    }
}
</style>