<script setup lang="ts">
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Backdrop from '@/components/Backdrop.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import Signout from '@/components/icons/Signout.vue'
import User from '@/components/icons/User.vue'
import MyAreaView from '@/views/MyAreaView.vue'
import { onMounted, ref, toValue } from 'vue'
import Notification from '@/components/Notification.vue'
import { useProfile } from '@/composables/useProfile'
import { awards } from '@/awards'
const { loggedUser, logout } = useProfile()
const isOpened = ref(false)
const toggle = () =>  isOpened.value = !isOpened.value
const next_award = ref()


onMounted(() => {
    if(toValue(loggedUser)){
        next_award.value = awards.find((award) => award.value > Number(loggedUser.value?.total_sales))
    }
})

const myAreaOpened = ref(false)
const myAreaToggle = () => {
    if(!myAreaOpened.value){
        toggle()
    }

    myAreaOpened.value = !myAreaOpened.value

}
</script>

<template>
    <div class="profile">
        <Row @click="toggle" class="profile__user--infos" align_items="center" justify_content="flex-end" column_gap="24px">
            <Row  justify_content="center" style="position: relative;" align_items="center" column_gap="10px">
                <Notification />
                <figure>
                    <img
                        class="profile__user--picture"
                        src="@/assets/images/user.png"
                        alt="Profile picture" />
                </figure>
    
                <ChevronDownIcon style="color: #000" />
            </Row>
        </Row>

        <Transition>
            <div v-if="isOpened">
                <ul class="profile__options">
                    <li class="profile__options__item" @click="myAreaToggle">
                        <Row align_items="center" column_gap="16px">
                            <User />
                            <span>Editar conta</span>
                        </Row>
                    </li>
                    <li class="profile__options__item" @click="logout">
                        <Row align_items="center" column_gap="16px">
                            <Signout />
                            <span>Sair</span>
                        </Row>
                    </li>
                </ul>
            </div>

        </Transition>
    </div>

    <Transition>
        <MyAreaView @closed="myAreaToggle" v-if="myAreaOpened" />
    </Transition>

    <Backdrop v-if="isOpened" @click="toggle" />
</template>

<style lang="scss" scoped>
.profile {
    position: relative;
    width: 168px;

    &__user {
        &--infos {
            cursor: pointer;
            &--sales {
                display: grid;
                align-items: center;
                grid-auto-flow: column;
                grid-template-columns: 68%;
                column-gap: 6px;

                &--target {
                    font-size: 9px;
                    min-width: 40px;
                }
            }

            svg {
                width: 40px;
                height: 40px;
                position: absolute;
                border: 1px solid #EBEBEB;
                background-color: var(--color-white);
                border-radius: 100%;
                padding: 6px;
                right: 18px;
                bottom: 10px;
            }
        }

        &--picture {
            border-radius: 100%;
            width: 43px;
            height: 43px;
        }
    }

    &__options {
        z-index: 10;
        position: absolute;
        top: 100%;
        right: 0;
        width: 197px;
        padding: 15px 16px;
        display: grid;
        background-color: var(--color-white);
        border-radius: 16px;
        min-width: 130px;
        border: 1px solid var(--color-primary);

        &__item {
            list-style-type: none;
            text-align: center;
            cursor: pointer;

            svg {
                color: var(--color-primary);
                width: 24px;
                height: 24px;
            }

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
}

@media only screen 
    and (min-width: 200px) 
    and (max-width: 1300px) 
    and (min-height: 200px) {

    .profile {
        &__user {
            &--infos {
                > .column {
                    display: none;
                }
            }
        }
        &__options {
            border: solid 1px var(--color-primary);
        }
    }
}
</style>