<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import Alert from '@/components/Alert.vue'
import ProducerView from '@/views/ProducerView.vue'
import { useProduct } from '@/composables/useProduct'
import { onMounted } from 'vue'

const { onGet } = useProduct()

onMounted(() => onGet())
</script>

<template>
    <section class="product">
        <Alert></Alert>
        <Tabs>
            <Tab title="Produtor">
                <ProducerView />
            </Tab>
            <Tab :disabled="true" title="Coprodutor (em breve)">
                <span>coprodutor</span>
            </Tab>
            <Tab :disabled="true" title="Afiliado (em breve)">
                <span>afiliado</span>
            </Tab>
        </Tabs>
    </section>
</template>

<style lang="scss" scoped>
.product {
    gap: 20px;
    display: flex;
    flex-direction: column;
}
</style>