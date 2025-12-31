<script setup lang="ts">
import Arrow from '@/components/icons/Arrow.vue'

import { ref } from 'vue'

const emit = defineEmits(['selected_date'])

interface ISelectableItem {
    label: string
    value: any
}

const props = defineProps({
    list: {
        type: Array<ISelectableItem>,
        required: false,
        default: []
    },
    label: {
        type: String,
        required: false,
        default: ''
    }
})

const selectedItem = ref(props.list[0])
const isOpened = ref(false)

const select = (option: ISelectableItem) => {
    isOpened.value = false
    selectedItem.value = option
    emit('selected_date', option.value)
}

const toggle = () => isOpened.value = !isOpened.value

</script>

<template>
    <div class="selectable">
        <button class="selectable__select" @click="toggle">
            <p>{{label}}:
                <span>{{selectedItem.label}}</span>
            </p>
            <Arrow :to="isOpened ? 180 : 360" />
        </button>
        <Transition>
            <div v-if="isOpened">
                <ul class="selectable__list">
                    <li
                        class="selectable__list__item"
                        v-for="(item, index) in list" :key="index" @click="select(item)">
                        {{ item.label }}
                    </li>
                </ul>
            </div>
        </Transition>
        <div v-if="isOpened" @click="toggle" class="selectable--backdrop"></div>
      </div>
</template>

<style lang="scss" scoped>
.selectable {
    position: relative;
    display: inline-block;

    &__select {
        cursor: pointer;
        display: flex;
        border: none;
        background-color: transparent;
        color: var(--color-white);
        align-items: center;
        gap: 6px;
        min-width: 200px;
        justify-content: flex-end;

        span {
            font-family: var(--font-family-bold);
        }

        p {
            display: flex;
            gap: 6px;
            text-align: right;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 14px;
        }
    }

    &__list {
        z-index: 10;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        padding: 17px 19px;
        display: grid;
        background-color: var(--color-popups);
        border-radius: 16px;
        min-width: 180px;

        &__item {
            list-style-type: none;
            text-align: center;
            cursor: pointer;

            &:first-child {
                padding-bottom: 15px;
            }

            &:last-child {
                padding-top: 15px;
            }

            &:not(:last-child) {
                border-bottom: 1px solid var(--color-gray);
            }

            &:not(:first-child):not(:last-child) {
                padding: 15px 0;
            }
        }
    }

    &--backdrop {
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 2;
        position: fixed;
        background-color: rgb(var(--color-backdrop-rgb), .2);
    }
}


.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>