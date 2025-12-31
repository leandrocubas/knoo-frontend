<script setup lang="ts">
import { useUtils } from '@/composables/useUtils'
import { onMounted } from 'vue'

const { cursorFollowEffect } = useUtils()

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
  background: {
    type: String,
    required: false,
    default: 'white'
  },
  border: {
    type: String,
    required: false,
    default: ''
  },
  fontHeaderColor: {
    type: String,
    required: false,
    default: '#000'
  }
})

const id = Math.random()
onMounted(() => {
  if(props.cursorAnimate) cursorFollowEffect(`card-${id}`, `card__cursor-${id}`)
})

</script>

<template>
  <div class="card" :id="'card-' + id" :style="{ 'min-height': needMinHeight ? '150px' : '', background, border }">
    <div class="card__header"  :style="{ 'background-color': bgHeaderColor, 'background': bgHeaderColor }" v-if="title">
      <span class="card__header--title" :style="{ 'color': fontHeaderColor }">{{ title }}</span>
    </div>
    <!-- <div class="card__cursor" :id="'card__cursor-' + id" v-if="cursorAnimate"></div> -->
     <div class="card__content" :style="{ background }" :class="{ 'card__content--has-header': title }">
       <slot />
     </div>
</div>
  
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid #EBEBEB;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  box-sizing: border-box;

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
    border-radius: 12px;
    padding: 10px;
    height: 100%;
    
    
    &--has-header {
      top: -10px;
    }
  }
}

@media (min-width: 768px) {
  .card {
    flex: 1 0 10rem;
  }
}

</style>