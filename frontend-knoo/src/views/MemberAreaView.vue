<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import Alert from '@/components/Alert.vue'
import AreaListView from '@/views/AreaListView.vue'
import CommentManagerView from './CommentManagerView.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  store.dispatch('area_module/get')
})
</script>

<template>
  <section class="members-area">
    <Alert></Alert>
    <Tabs>
      <Tab title="Áreas">
        <AreaListView />
      </Tab>
      <Tab title="Comentários">
        <CommentManagerView />
      </Tab>
    </Tabs>
  </section>
</template>

<style lang="scss" scoped>
.members-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
