<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import ModuleListView from './ModuleListView.vue'
import IntegrationsView from './IntegrationsView.vue'

</script>

<template>
    <div class="members-area">
        <Tabs>
            <Tab title="Módulos">
              <ModuleListView />
            </Tab>
            <Tab title="Integrações">
                <IntegrationsView />
            </Tab>
        </Tabs>
    </div>
</template>

<style lang="scss" scoped>
.members-area {
    width: 100%;
}
</style>