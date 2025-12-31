<script setup lang="ts">
import { ref, provide, useSlots, watchEffect } from 'vue'

const slots = useSlots()

const tabProps = ref(slots.default?.().map((tab) => tab.props) ?? [])
const selectedTab = ref(tabProps.value[0])
provide('selectedTab', selectedTab)

watchEffect(() => {
  if (slots.default && selectedTab.value) {
    const newTabProps = slots.default().map((tab) => tab.props)
    if (newTabProps.length && !newTabProps.includes(selectedTab.value)) {
      const tabIndex = newTabProps.findIndex(el => el?.title === selectedTab?.value?.title)
      selectedTab.value = newTabProps[tabIndex]
    }

    tabProps.value = newTabProps
  }
})

const emit = defineEmits(['tabSelected'])

const selectTab = (tab: any) => {
  if(tab.disabled) return

  emit('tabSelected', tab)
  
  selectedTab.value = tab
}
</script>

<template>   
<div class="tabs">
  <ul class="tabs__tab">
    <li
      :class="{
        'tabs__tab--active': selectedTab?.title === tab?.title,
        'tabs__tab--disabled': tab?.disabled
      }"
      class="tabs__tab--title"
      v-for="(tab) in tabProps"
      :key="tab?.title"
      @click="selectTab(tab)">
      <component v-if="tab.icon" :is="tab.icon" />
      <span>{{ tab?.title }}</span>
    </li>
    <li class="tabs__tab--action" v-if="slots.action">
        <slot name="action"/>
    </li>
  </ul>
  <slot />
</div>
</template>

<style lang="scss" scoped>
.tabs {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    &__tab {
      list-style-type: none;
      display: flex;
      transition: .6s;
      padding: 0;
      font-size: 16px;
      cursor: pointer;
      color: rgba(var(--color-gray-light));
      justify-content: center;

      &--active {
        color: var(--color-primary);
        border-bottom: 1px solid var(--color-primary);
        transition: .6s;
      }

      &--disabled {
        color: rgba(var(--color-gray-rgb), .8);
        transition: .6s;
        cursor: not-allowed;
      }

      &--title {
        width: 241px;
        display: flex;
        justify-content: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        align-items: center;

        > span {
          padding: 10px;
          display: flex;
        }
      }

      &--action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 56%;
      }
    }
}

@media only screen
  and (max-width: 753px)
  and (min-width: 643px) {
        .tabs {
          &__tab {
            &--title {
              width: 33%;
              align-items: center;
            }
          }
        }
    }

@media only screen
  and (max-width: 1190px) {
        .tabs {
          &__tab {
            &--action {
              display: none;
            }
          }
        }
    }

@media only screen
  and (max-width: 642px){
        .tabs {
          &__tab {
            &--title {
              width: 33%;
              align-items: center;
              span {
                font-size: 14px;
              }
            }
          }
        }
    }
</style>