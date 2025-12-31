<script setup lang="ts">
import { useUtils } from '@/composables/useUtils'
import { onMounted, useSlots, type Slots } from 'vue'

const { cursorFollowEffect, formatMoney } = useUtils()
const slots: Slots = useSlots()
const hasSlotContent = !!slots.default

const props = defineProps({
  needMinHeight: {
    type: Boolean,
    required: false,
    default: true
  },
  cursorAnimate: {
    type: Boolean,
    required: false,
    default: false
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  subTitle: {
    type: String,
    required: false,
    default: ''
  },
  bgHeaderColor: {
    type: String,
    required: false,
    default: '#E3FFFF'
  },
  symbol: {
    type: String,
    required: false,
    default: 'R$'
  },
  fontHeaderColor: {
    type: String,
    required: false,
    default: '#000'
  },
  value: {
    type: Number,
    required: true,
    default: 0
  },
  percentage: {
    type: Number,
    required: true,
    default: 0
  }
})

const id = Math.random()
onMounted(() => {
  if(props.cursorAnimate) cursorFollowEffect(`card-${id}`, `card__cursor-${id}`)
})

</script>

<template>
  <div class="card" :id="'card-' + id" :style="{ 'min-height': needMinHeight ? '150px' : '' }">
    <div class="card__header"  :style="{ 'background-color': bgHeaderColor, 'background': bgHeaderColor }" v-if="title">
      <span class="card__header--title" :style="{ 'color': fontHeaderColor }">{{ title }}</span>
    </div>
    <!-- <div class="card__cursor" :id="'card__cursor-' + id" v-if="cursorAnimate"></div> -->
     <div v-if="!hasSlotContent" class="card__content" :class="{ 'card__content--has-header': title }">
       <span class="card__content--sub-title" v-if="subTitle">{{subTitle}}</span>

       <div class="card__content--infos">
        <span class="card__content--infos--symbol">{{ symbol }} <a class="card__content--infos--amount">{{formatMoney((value / 100), false)}}</a></span>
        <div class="card__content--infos--percentage" v-if="percentage">
          <svg v-if="percentage >= 0" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.25 9.07935L9.25 3.07935M9.25 3.07935H4.75M9.25 3.07935V7.57935" stroke="#04CA68" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.45898 3.07935L9.45898 9.07935M9.45898 9.07935H4.95898M9.45898 9.07935V4.57935" stroke="#FF355B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{`${percentage > 0 ? '+' : ''}${percentage}`}} %
        </div>
       </div>
     </div>

     <div v-else class="card__content">
      <slot></slot>
     </div>
</div>
  
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid #EBEBEB;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: calc(33.33% - 1rem);
  min-width: 10rem;

  &:hover .card__cursor {
    display: block;
  }


  &__cursor {
    width: 100px;
    height: 100px;
    position: absolute;
    pointer-events: none;
    display: none;
    filter: blur(90px);
    background: rgba(var(--color-primary-rgb), .4);
  }

  &__header {
    border-radius: 12px 12px 0 0;
    min-height: 50px;
    display: flex;
    padding: 12px;
    font-size: 12px;

    &--title {
      font-weight: 600;
    }
  }

  &__content {
    position: relative;
    max-height: 190px;
    border-radius: 12px;
    padding: 24px;
    height: 100%;
    border-top: 1px solid #EBEBEB;
    background: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--infos {
      display: flex;
      flex-direction: column;
      gap: 12px;

      &--symbol {
        font-weight: 400;
        font-size: 20px; 
        color: #A8B0CB;
      }

      &--amount {
        color: #201E24;
        font-size: 32px;
        font-weight: 500;
      }

      &--percentage {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: fit-content;
        height: 26px;
        gap: 10px;
        border-radius: 4px;
        border: 1px solid #EBEBEB;
        padding: 14px;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    &--sub-title {
      font-weight: 500;
      font-size: 12px;
      color: #A8B0CB;
    }
    
    
    &--has-header {
      top: -10px;
    }
  }
}

@media (max-width: 768px) {
  .card {
    max-width: 100%; /* Faz com que ocupe toda a largura no mobile */
  }
}

</style>