<script setup lang="ts">
import { Offer, type IOffer } from '@/store/offer/interface/offer.interface'
import { ref, type PropType } from 'vue'

import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import Facebook from '@/components/icons/Facebook.vue'
import GoogleAds from '@/components/icons/GoogleAds.vue'
import GoogleAnalytics from '@/components/icons/GoogleAnalytics.vue'
import FacebookIntegrationView from '@/views/FacebookIntegrationView.vue'

defineProps({
  offer: {
    type: Object as PropType<IOffer>,
    required: false,
    default: undefined
  }
})
</script>

<template>
    <div class="offer-integration">
        <div class="offer-integration__header">
            <label class="offer-integration__header__title">Integrações</label>
            <span class="offer-integration__header__description">Configure integrações com Facebook, Google Ads e Google Analytics</span>
        </div>

        <div class="offer-integration__tabs">
            <Tabs>
                <Tab title="Facebook" :icon="Facebook">
                    <FacebookIntegrationView :offer />
                </Tab>
                <Tab :disabled="true" :icon="GoogleAds" title="Google Ads">
                    <span>google ads</span>
                </Tab>
                <Tab :disabled="true" :icon="GoogleAnalytics" title="Google Analytics">
                    <span>google analytics</span>
                </Tab>
            </Tabs>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.offer-integration {
    display: grid;
    row-gap: 24px;
    &__header {
        display: grid;
        row-gap: 12px;

        &__title {
            font-family: var(--font-family-bold);
            font-size: 16px;
            text-align: center;
            color: #000;
            font-size: 16px;
            font-weight: 500;
        }
        
        &__description {
            font-size: 14px;
            color: var(--color-secondary);
            text-align: center;
        }
    }
}
</style>