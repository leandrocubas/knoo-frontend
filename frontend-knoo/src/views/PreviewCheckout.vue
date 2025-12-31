<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Close from '@/components/icons/Close.vue'
import Navigator from '@/components/Navigator.vue'
import Mobile from '@/components/Mobile.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import Timer from '@/components/Timer.vue'
import Column from '@/components/Column.vue'
import Button from '@/components/Button.vue'
import Row from '@/components/Row.vue'
import Checkbox from '@/components/Checkbox.vue'
import CheckoutIcons from '@/components/icons/CheckoutIcons.vue'
import { useCheckout } from '@/composables/useCheckout'
import { useUtils } from '@/composables/useUtils'
import { ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/vue/24/outline'


const { togglePreviewMode, checkout } = useCheckout(onMounted, false)
const { baseURLImages, timeToMilliSeconds, formatMoney } = useUtils()
const imagePath = ref(checkout?.value.banner.s3_name ? baseURLImages.value + checkout?.value.banner.s3_name : '')
const image = computed(() => {
    const img = new Image()
    img.src = imagePath.value

    return img
})
const timer = computed(() => timeToMilliSeconds(checkout?.value.timer.countdown))
const imageOrientation = ref('portrait')
const imageData = ref()
const isWebSelected = ref(false)
const isMobileSelected = ref(true)

onMounted(() => {
    const img = new Image()
    imageOrientation.value = img.width > img.height ? 'landscape' : 'portrait'
    imageData.value = baseURLImages.value + checkout.value.banner.s3_name
    
    img.onload = () => {
        imageOrientation.value = img.width > img.height ? 'landscape' : 'portrait'
    }

    img.onerror = (error) => {
        imageData.value = null
    }
    img.src = imageData.value
})

const imageStyle = computed(() => imageOrientation.value === 'landscape' ?
      ({ minWidth: '100%', maxHeight: '40vh', borderRadius: '10px', width: '100%' }) :
      ({ maxHeight: '70vh', borderRadius: '10px' })
)

const imageMobileStyle = computed(() => imageOrientation.value === 'landscape' ?
      ({ minWidth: '100%', maxHeight: '19vh', borderRadius: '10px' }) :
      ({ maxHeight: '70vh', borderRadius: '10px' })
)

const banner_container_style = computed(() => (imageOrientation.value === 'landscape' || imageOrientation.value === 'portrait') && imageData.value ?
    ({ width: 'fit-content', height: 'fit-content' }) :
    !imageData.value ? ({ width: '100%' }) : null
)
</script>

<template>
    <div class="preview-checkout">
    <section class="preview-checkout__header">
            <h1>Pré Visualizar</h1>

            <div class="preview-checkout__header__device-selector">
                <div
                    @click="isWebSelected = true; isMobileSelected = false"
                    class="preview-checkout__header__device-selector--option"
                    :class="{ 'preview-checkout__header__device-selector--option--selected animate__animated animate__tada': isWebSelected  }">
                    <ComputerDesktopIcon />
                </div>
                <div
                    @click="isWebSelected = false; isMobileSelected = true"
                    class="preview-checkout__header__device-selector--option"
                    :class="{ 'preview-checkout__header__device-selector--option--selected animate__animated animate__tada': isMobileSelected }">

                    <DevicePhoneMobileIcon />
                </div>
            </div>

            <Close @click="togglePreviewMode" />
        </section>
        <section class="preview-checkout__content">
            <Navigator :background-color="checkout?.configs?.background_color" class="navigator" v-if="isWebSelected">
                <div class="navigator__content--website">
                    <section
                        v-if="checkout?.timer.display"
                        class="navigator__content--website--timer"
                        :style="{ 'background-color': checkout?.timer?.timer_bg_color }">
                        <Timer
                            :end-message="checkout?.timer?.end_timer_title"
                            :timer="timer"/>
                        <CheckoutIcons :color="checkout?.timer?.timer_icon_color" icon="timer" />
                        <span :style="{ color: checkout?.timer?.timer_title_color }">{{checkout?.timer?.timer_title}}</span>
                    </section>

                    <section class="navigator__content--website--banner" v-if="checkout?.banner?.display">
                        <label>
                            <div class="checkout__content__banner--banner-image" :style="banner_container_style">
                                <img :src="imagePath" :style="imageStyle">
                            </div>
                        </label>
                    </section>
                    
                    <section class="navigator__content--website--static-area">
                        <Column gap="36px">
                            <Column gap="50px">
                                <Column gap="16px">
                                    <GhostLoading :height="18" :animate="false" />
                                    <GhostLoading :width="50" :height="18" :animate="false" />
                                    <GhostLoading :width="80" :height="18" :animate="false" />
                                </Column>
            
            
                                <Row column_gap="14px">
                                    <div class="navigator__content--website--static-area--square"></div>
                                    <div class="navigator__content--website--static-area--square"></div>
                                    <div class="navigator__content--website--static-area--square"></div>
                                    <div class="navigator__content--website--static-area--square"></div>
                                    <div class="navigator__content--website--static-area--square"></div>
                                </Row>
                            </Column>
        
                            <Button />
                        </Column>
                    </section>

                    <section class="navigator__content--website--order-bumps" v-if="checkout.order_bumps.length">
                        <div class="navigator__content--website--order-bumps__header">
                            <label>{{checkout.checkout_infos.order_bump_title}}</label>
                        </div>
                        <div class="navigator__content--website--order-bumps__content">
                            <div
                                v-for="(order, index) in checkout.order_bumps"
                                class="navigator__content--website--order-bumps__content--order">
                                <Row>
                                    <Checkbox :id="index.toString()" />
                                        <figure>
                                            <img class="product-image" :src="order?.s3_url">
                                        </figure>
                                        <div class="product-infos">
                                            <p>{{order.offer_name}}</p>
                                            <div class="offer-infos">
                                                <span class="navigator__content--website--order-bumps__content--order__fake-price">{{formatMoney(order.fake_price)}}</span>
                                                <span>por apenas</span>
                                                <span class="navigator__content--website--order-bumps__content--order__price">{{formatMoney(order.price)}}</span>
                                            </div>
                                        </div>
                                    </Row>
                            </div>
                        </div>
                    </section>
                </div>
            </Navigator>
            <Mobile :background="checkout?.configs?.background_color" v-else-if="isMobileSelected">
                
                <div class="navigator__content--mobile">
                    
                    <section
                        :style="{
                            'background-color': checkout?.timer?.timer_bg_color,
                        }"
                        class="navigator__content--mobile--timer" v-if="checkout?.timer.display">

                        <Timer
                            :end-message="checkout?.timer?.end_timer_title"
                            :timer="timer"/>
                        <CheckoutIcons :color="checkout?.timer?.timer_icon_color" icon="timer" />
                        <span :style="{ color: checkout?.timer?.timer_title_color }">{{checkout?.timer?.timer_title}}</span>
                    </section>

                    <section
                        class="navigator__content--mobile--banner-landscape"
                        v-if="checkout?.banner.display && imageOrientation === 'landscape'"
                        :style="{
                            ...banner_container_style,
                            'min-height': '20%',
                        }">
                        <img :src="imagePath" :style="imageMobileStyle">
                    </section>

                    <section
                        class="navigator__content--mobile--banner-portrait"
                        v-if="checkout?.banner.display && imageOrientation !== 'landscape'"
                        :style="{
                            'height': `${image.height - 10}px`,
                            'width': `${image.width - 10}px`,
                            'background': `url(${imagePath})`,
                            'min-height': '70%'
                        }">
                    </section>

                    <section class="navigator__content--mobile--static">
                        <Column gap="36px">
                            <Column gap="20px">
                                <Column gap="16px">
                                    <GhostLoading :height="18" :animate="false" />
                                    <GhostLoading :width="50" :height="18" :animate="false" />
                                    <GhostLoading :width="80" :height="18" :animate="false" />
                                </Column>
            
            
                                <Row column_gap="14px">
                                    <div class="navigator__content--mobile--static--square"></div>
                                    <div class="navigator__content--mobile--static--square"></div>
                                    <div class="navigator__content--mobile--static--square"></div>
                                </Row>
                            </Column>
        
                            <Button />
                        </Column>
                    </section>

                    <section class="navigator__content--mobile--order-bumps" v-if="checkout.order_bumps.length">
                        <div class="navigator__content--mobile--order-bumps__header">
                            <label>{{checkout.checkout_infos.order_bump_title}}</label>
                        </div>
                        <div class="navigator__content--mobile--order-bumps__content">
                            <div
                                v-for="(order, index) in checkout.order_bumps"
                                class="navigator__content--mobile--order-bumps__content--order">
                                <Row>
                                        <figure>
                                            <img class="product-image" :src="order?.s3_url">
                                        </figure>
                                        <div class="product-infos">
                                            <p>{{order.offer_name}}</p>
                                            <div class="offer-infos-mobile">
                                                <span class="navigator__content--mobile--order-bumps__content--order__fake-price">{{formatMoney(order.fake_price)}}</span>
                                                <span class="navigator__content--mobile--order-bumps__content--order__price">{{formatMoney(order.price)}}</span>
                                            </div>
                                        </div>
                                    </Row>
                            </div>
                        </div>
                    </section>
                    
                </div>
            </Mobile>
        </section>
    </div>
</template>

<style lang="scss" scoped>

.navigator {
    width: 40%;
    height: 70%;

    &__content {
        &--website {
            width: 100%;
            display: grid;
            justify-content: center;
            gap: 10px;
            //position: absolute;
            padding: 14px;
            grid-template-areas:
                'timer timer timer'
                'banner banner banner'
                'static-area static-area static-area'
                'orderBumps orderBumps orderBumps';

            &--timer {
                grid-area: timer;
                display: flex;
                gap: 20px;
                align-items: center;
                justify-content: center;
                height: 70px;
                border-radius: 10px;

                .timer {
                    width: fit-content !important;
                    min-width: 80px !important;
                }
            }

            &--banner {
                grid-area: banner;
                border-radius: 6px;
                background-size: cover;
                background-position: center;
                margin-top: 6px;

                > label {
                    display: flex;
                    justify-content: center;
                    position: relative;
                    align-items: center;
                    min-height: 168px;
                    border-radius: 10px;
                    cursor: pointer;
                    
                    &--select-image {
                        min-height: 168px;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        flex-direction: column;
                        gap: 10px;
                        cursor: pointer;
                        * {
                            cursor: pointer;
        
                        }
                    }
        
                    &--image-loading {
                        width: 100%;
                        position: relative;
                        cursor: not-allowed;
                        border-radius: 10px;
                        min-height: 168px;
                        background-color: var(--color-background);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
        
                    &--banner-image {
                        svg {
                            cursor: pointer;
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            z-index: 2;                  
                            background: var(--color-primary);
                            border-radius: 16px;
                        }
        
                        img {
                            width: 100%;
                        }
        
                        &--loading {
                            height: 100%;
                            position: absolute;
                            background: black;
                            border-radius: 10px;
                            width: 100%;
                            opacity: .8;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: var(--font-family-bold);
                        }
                    }
        
                    svg {
                        width: 24px;
                    }
                }
            }

            &--static-area {
                grid-area: static-area;
                background: #E5E2E3;
                border-radius: 10px;
                width: 100%;
                height: 388px;
                padding: 30px 36px;

                .column {
                    width: 100%;
                }

                &--square {
                    background: #A69FA2;
                    width: 92px;
                    height: 88px;
                    border-radius: 6px;
                }
            }

            &--order-bumps {
                grid-area: orderBumps;
                width: 100%;
                display: grid;
                padding-bottom: 20px;
                margin-top: 6px;

                &__header {
                    background-color: var(--color-primary);
                    padding: 16px;
                    border-radius: 10px 10px 0px 0px;
                    label {
                        font-family: var(--font-family-bold);
                    }
                }

                &__content {
                    border-bottom: 1px dashed var(--color-primary);
                    border-left: 1px dashed var(--color-primary);
                    border-right: 1px dashed var(--color-primary);
                    border-radius: 0 0 10px 10px;
                    cursor: pointer;
                    
                    &--order {
                        cursor: pointer;
                        padding: 10px;
                        display: grid;
                        
                        .product-image {
                            height: 46px;
                            border-radius: 4px;
                            margin-right: 10px;
                        }

                        &:hover {
                            background: rgba(var(--color-primary-rgb), .2);
                        }
                        &:not(:last-child){
                            padding-bottom: 10px;
                            border-bottom: 1px solid rgba(var(--color-gray-rgb), .4);
                        }
                        &:not(:first-child){
                            padding-top: 10px;
                        }

                        span {
                            font-family: var(--font-family-bold);
                        }

                        &__fake-price {
                            color: var(--color-error);
                            text-decoration: line-through;
                        }

                        &__price {
                            color: var(--color-success);
                        }

                        div.product-infos {
                            display: grid;

                            div.offer-infos {
                                display: flex;
                                gap: 4px;
                            }
                        }
                    }
                }
            }
        }

        &--mobile {
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
            z-index: 3;
            margin-top: 26px;
            align-items: center;

            &--timer {
                width: 100%;
                min-height: 16%;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 3;
                gap: 8px;
                border-radius: 10px;
                padding: 10px;
            }
            
            &--banner-landscape {
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
                border-radius: 10px;

                img {
                    width: 100%;
                }
            }

            &--banner-portrait {
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
                background-repeat: no-repeat;
                background-size: cover;
                overflow: hidden;
                border-radius: 19px;
                background-position: center;

                img {
                    width: 100%;
                }
            }

            &--static {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                background: #E5E2E3;
                border-radius: 10px;
                z-index: 2;
                padding: 18px 20px;
                width: 100%;

                .column {
                    width: 100%;
                }

                &--square {
                    background: #A69FA2;
                    width: 72px;
                    height: 60px;
                    border-radius: 6px;
                }
            }

            &--order-bumps {
                grid-area: orderBumps;
                width: 100%;
                display: grid;
                padding-bottom: 20px;

                &__header {
                    background-color: var(--color-primary);
                    padding: 16px;
                    border-radius: 10px 10px 0px 0px;
                    label {
                        font-family: var(--font-family-bold);
                    }
                }

                &__content {
                    border-bottom: 1px dashed var(--color-primary);
                    border-left: 1px dashed var(--color-primary);
                    border-right: 1px dashed var(--color-primary);
                    border-radius: 0 0 10px 10px;
                    cursor: pointer;
                    
                    &--order {
                        cursor: pointer;
                        padding: 10px;
                        display: grid;

                        .product-image {
                            height: 46px;
                            border-radius: 4px;
                            margin-right: 10px;
                        }

                        &:hover {
                            background: rgba(var(--color-primary-rgb), .2);
                        }
                        &:not(:last-child){
                            padding-bottom: 10px;
                            border-bottom: 1px solid rgba(var(--color-gray-rgb), .4);
                        }
                        &:not(:first-child){
                            padding-top: 10px;
                        }

                        span {
                            font-family: var(--font-family-bold);
                        }

                        &__fake-price {
                            color: var(--color-error);
                            text-decoration: line-through;
                        }

                        &__price {
                            color: var(--color-success);
                        }

                        div.product-infos {
                            display: grid;

                            div.offer-infos-mobile {
                                display: flex;
                                gap: 4px;
                            }
                        }
                    }
                }
            }
            
        }
    }
}

.preview-checkout {
    background-color: var(--color-background);
    position: fixed;
    top: 0;
    width: 100%;
    right: 0;
    transition: .3s;
    z-index: 2;
    overflow-y: auto;
    height: 100vh;
    overflow-x: hidden;
    padding: 20px;
    display: grid;
    gap: 40px;
    grid-template-rows: 36px;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__device-selector {
            display: flex;
            gap: 10px;
            &--option {
                cursor: pointer;
                padding: 6px;
                border-radius: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(var(--color-primary-rgb), .4);
                opacity: .8;

                &--selected {
                    border: 1px solid rgba(var(--color-primary-rgb), .4);
                    opacity: 1 !important;
                }

                svg {
                    color: var(--color-white);
                    opacity: .6;
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }

    &__content {
        display: flex;
        justify-content: center;
    }
}

</style>