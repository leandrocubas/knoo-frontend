<script setup lang="ts">
import Backdrop from '@/components/Backdrop.vue'
import Close from '@/components/icons/Close.vue'
import Row from '@/components/Row.vue'
import type { Size } from '@/enums/size.enum'
import type { PropType, StyleValue } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  border: {
    type: Boolean,
    required: false,
    default: false
  },
  maxWidth: {
    type: String,
    required: false,
    default: null
  },
  size: {
    type: String as PropType<Size>,
    required: false,
    default: 'default'
  },
  hasClose: {
    type: Boolean,
    required: false,
    default: true
  },
  mode: {
    type: String,
    required: false,
    default: 'normal'
  }
})

const closedDialog = () => {
  (props.open as boolean) = !props.open
  emit('opened', false)

}

const emit = defineEmits(['opened'])

const style = {
  'max-width': props.maxWidth,
} as StyleValue
</script>

<template>
  <section class="dialog" v-if="open">
    <div class="dialog__backdrop">

      <div class="dialog__content" :style="style">
        <header v-if="mode !== 'none-header'">
          <img v-if="mode === 'normal'" src="@/assets/svg/colored-header.svg" />
          <img v-if="mode === 'delete'" src="@/assets/svg/delete-header.svg" />
        </header>

        <Row v-if="title" align_items="center" justify_content="center" style="padding: 0 20px; width: 100%; text-align: center;">
          <span style="width: 100%; font-size: 16px; font-weight: 500; margin-bottom: 16px;">{{title}}</span>
        </Row>
        <slot />
      </div>

    </div>
    <!-- <Backdrop v-if="open" :opacity="0" @click="(open as boolean) = !open; closedDialog()" /> -->
  </section>
    <!-- <section class="dialog" v-if="open">
        <Transition>
          <div class="dialog__outside" @click="closedDialog()">
            <Row justify_content="center">
              <div 
                class="dialog__content" 
                :style="style" 
                v-class="{ bordered: border, [props.size]: true }" 
                v-if="open"
                @click="(event: MouseEvent) => event.stopPropagation()"
              >
                <div class="dialog__content--header">
                  <Row :justify_content="title ? hasClose ? 'space-between' : 'center' : 'flex-end'">
                    <label v-if="title">{{title}}</label>
                    <Close v-if="hasClose" @click="(open as boolean) = !open; closedDialog()" />
                  </Row>
                </div>
  
                <slot></slot>
        
              </div>
            </Row>
          </div>
        </Transition>
        <Backdrop v-if="open" :opacity=".9" @click="(open as boolean) = !open; closedDialog()" />
    </section> -->
</template>

<style lang="scss" scoped>

.dialog {

  width: 100vw;
  left: 0;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 2;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);

  &__content {
    width: fit-content;
    background-color: white;
    display: flex;
    flex-direction: column;

    > header {
      img {
        width: 100%;
        border-radius: 10px 10px 0px 0px;
      }
    }
  }

  
  &__backdrop {
    z-index: 6;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
}

/* .dialog {
    position: relative;
    display: inline-block;
    background-color: rgb(var(--color-side-menu-rgb));

    &__outside {
      width: 100%;
      height: 100%;
      z-index: 3;
      position: fixed;
      top: 0;
      right: 0;
      overflow-y: scroll;
      display: flex;
      align-items: center;
    }

    &__content {
        display: flex;
        flex-direction: column;
        height: auto;
        z-index: 4;
        border: none;
        border-radius: 20px;
        padding: 30px;
        background-color: var(--color-popups);
        gap: 27px;

        &--small {
          width: 30vw;
        }

        &--default { 
          width: 42vw;
        }

        &--large { 
          width: 52vw;
        }

        &--extra-large { 
          width: 70vw;
          min-height: 18rem;
        }
        
        &--bordered {
          border: 1px solid rgba(var(--color-dialog-border-rgb), .4);
        }

        &--header {
          height: 24px;
        
          svg {
            width: 24px;
          }

          label {
            font-family: var(--font-family-bold);
            font-size: 20px;
          }

        }
        &--title {
          font-size: 16px;
          font-weight: 700;
        }
    }
}

*/

.v-enter-active,
.v-leave-active {
  transition: opacity .2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


@media only screen 
    and (max-width: 935px) {

    .dialog {
        &__content {
          left: auto;
          width: auto;
        }
    }
}

@media only screen and
    (max-width: 400px) {
        .dialog {
            &__content {
                top: 12%;
            }
        }
  }

</style>