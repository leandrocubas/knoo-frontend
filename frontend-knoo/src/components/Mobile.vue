<script setup lang="ts">
defineProps({
  background: {
    type: String,
    required: false,
    default: ''
  },
  slideOut: {
        type: Boolean,
        default: false
    },
})
</script>

<template>
    <section class="mobile" :class="{ 'animate__animated animate__backInRight': !slideOut  }">
        <img src="@/assets/images/mobile-frame-rose.png"/>
        <div class="mobile__content" :style="{ 'background-color': background }">
            <slot />
        </div>
    </section>
</template>

<style lang="scss" scoped>
.mobile {
    position: absolute;
    padding: 0 10px 30px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    slot {
        width: 100%;
        height: 96%;
        border-radius: 8px;
        
    }
    img {
        height: 668px;
        width: 370px;
        position: absolute;
        z-index: 2;
    }

    &__content {
        padding: 0 10px;
        overflow-y: auto;
        height: 636px;
        width: 324px;
        border-radius: 38px;
        z-index: 3;
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;

        &__top {
            position: fixed;
            z-index: 1;
            border-radius: 30px 30px 0 0;
        }
        
        &__bottom {
            position: fixed;            
            z-index: 1;
            border-radius: 0 0 30px 30px;
            
        }
    }
}
</style>