<script setup lang="ts">
import NoData from '@/components/icons/NoData.vue'
import Column from '@/components/Column.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Toggle from '@/components/Toggle.vue'
import Dialog from '@/components/Dialog.vue'
import Row from '@/components/Row.vue'
import Chip from '@/components/Chip.vue'
import { StatusEnum } from '@/enums/status.enum'
import { usePixel } from '@/composables/usePixel'
import { computed, onMounted, type PropType } from 'vue'
import type { IOffer } from '@/store/offer/interface/offer.interface'
import Pencil from '@/components/icons/Pencil.vue'

const {
    isAdding,
    isLoading,
    pixel,
    pixels_to_add,
    isEditingPixel,
    pixelToEdit,
    onTogglePixelDialog,
    addPixel,
    setPixelList,
    toggleEditPixelDialog,
    onEdit
} = usePixel()

const props = defineProps({
  offer: {
    type: Object as PropType<IOffer>,
    required: false,
    default: undefined
  }
})

const isEditing = computed(() => !!props.offer)

onMounted(() => {
    if(props.offer || isEditing.value) setPixelList(props.offer?.integration_facebook ?? [])
})

</script>

<template>
    <div class="facebook-integration">
        <Dialog
            @opened="onTogglePixelDialog"
            :open="isAdding"
            title="Criar novo pixel do Facebook">
            <div class="dialog__content">
                <Column gap="20px">
                    <Input name="pixel_number" v-model="pixel.pixel_id" :is-loading="isLoading" label="Pixel ID"/>
                    <Input name="domain" v-model="pixel.access_token" :is-loading="isLoading" label="Token de conversão"/>

                    <Column gap="16px">
                        <Toggle :show-label="true" label="Disparar ao visitar checkout" v-model="pixel.send_initiate_checkout" />
                        <Toggle :show-label="true" label="Disparar ao aprovar Cartão / Pix" v-model="pixel.send_purchase_on_approved_payment" />
                    </Column>
                </Column>
            </div>

            <div class="dialog__footer">
                <span @click="onTogglePixelDialog">Cancelar</span>

                <div class="dialog__footer--button">
                    <Button :disabled="!pixel.access_token || !pixel.pixel_id" @click="addPixel" :is-loading="isLoading">Salvar</Button>
                </div>
            </div>
        </Dialog>

        <Dialog
            @opened="toggleEditPixelDialog(null)"
            :open="isEditingPixel"
            title="Editar pixel do Facebook">
            <div class="dialog__content">
                <Column gap="20px">
                    <Input :disabled="true" name="pixel_number" v-model="pixelToEdit.pixel_id" :is-loading="isLoading" label="Pixel ID"/>
                    <Input name="domain" v-model="pixelToEdit.access_token" :is-loading="isLoading" label="Token de conversão"/>

                    <Column gap="16px">
                        <Toggle :show-label="true" label="Disparar ao visitar checkout" v-model="pixelToEdit.send_initiate_checkout" />
                        <Toggle :show-label="true" label="Disparar ao aprovar Cartão / Pix" v-model="pixelToEdit.send_purchase_on_approved_payment" />
                    </Column>
                </Column>
            </div>

            <div class="dialog__footer">
                <span @click="toggleEditPixelDialog(null)">Cancelar</span>

                <div class="dialog__footer--button">
                    <Button :disabled="!pixelToEdit.access_token || !pixelToEdit.pixel_id" @click="onEdit" :is-loading="isLoading">Editar</Button>
                </div>
            </div>
        </Dialog>

        <div class="facebook-integration__no-result" v-if="pixels_to_add?.length <= 0">
            <Column gap="45px" align_items="center">
                <Column gap="24px" align_items="center">
                    <NoData />
    
                    <label class="facebook-integration__no-result--label">Nenhum pixel do Facebook criado para esta oferta</label>
                </Column>

                <div class="facebook-integration__no-result--add">
                    <Button @click="onTogglePixelDialog">+ Adicionar Pixel</Button>
                </div>
            </Column>
        </div>

        <div v-else class="facebook-integration__pixel-list">
            <div class="facebook-integration__pixel-list--item" v-for="p in pixels_to_add">
                <Row column_gap="76px">
                    <Column>
                        <label class="facebook-integration__pixel-list--name">Pixel ID</label>
                        <span>{{ p.pixel_id }}</span>
                    </Column>
                    
                    <Column>
                        <label class="facebook-integration__pixel-list--name">Token de conversão</label>
                        <span>{{ p?.access_token?.length > 20 ? `${p?.access_token?.slice(0, 20)}...` : p?.access_token }}</span>
                    </Column>
                   
                    <Column>
                        <label class="facebook-integration__pixel-list--name">Disparo do Pixel</label>
                        <Row column_gap="8px">
                            <Chip v-if="p.send_initiate_checkout" :type="StatusEnum.PIXEL_ACTION">Disparar ao visitar checkout</Chip>
                            <Chip v-if="p.send_purchase_on_approved_payment" :type="StatusEnum.PIXEL_ACTION">Disparar ao aprovar Cartão / Pix</Chip>
                        </Row>
                    </Column>
                    <span @click="toggleEditPixelDialog(p)" style="position: absolute; top: 6px; right: 12px; cursor: pointer;" v-if="isEditing"><Pencil /></span>
                </Row>
            </div>

            <div class="facebook-integration__no-result--add">
                <Button @click="onTogglePixelDialog">+ Adicionar Pixel</Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('/src/assets/dialog.scss');

.facebook-integration {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40vh;

    &__no-result {
        &--label {
            font-size: 14px;
            color: var(--color-secondary);
        }

        &--add {
            width: 221px;
        }
    }

    &__pixel-list {
        display: flex;
        width: 50%;
        flex-direction: center;
        flex-direction: column;
        gap: 20px;

        &--item {
            border: 1px solid rgba(181, 154, 255, 1);
            border-radius: 8px;
            background-color: rgba(250, 249, 255, 1);
            padding: 20px 28px;
            width: fit-content;
            position: relative;
            min-width: 96%;
        }

        &--name {
            color: #A8B0CB;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            .chip--pixel-action {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        &--value {
            color: #000;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }
}
</style>