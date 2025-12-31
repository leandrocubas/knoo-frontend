<script setup lang="ts">
import { useDashboard } from '@/composables/useDashboard'
import { useProfile } from '@/composables/useProfile'
import RadioButton from '@/components/RadioButton.vue'
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import User from '@/components/icons/User.vue'
import Close from '@/components/icons/Close.vue'
import AddNewAccountCNPJView from '@/views/AddNewAccountCNPJView.vue'
import AddNewAccountCPFView from '@/views/AddNewAccountCPFView.vue'
import { ref, toValue } from 'vue'

const {
  loggedUser
} = useProfile()

const {
  isAccountTypeOpen,
  pf,
  pj,
  isConfigCPF,
  isConfigCNPJ,
  onNextAccountType,
  onToggleAccountType
} = useDashboard()

const validate_doc_title = `${toValue(loggedUser)?.name}, tenho um recado para você!`
const validate_doc_description = 'Vim te avisar que você precisa confirmar os seus documentos antes de começar a vender. Te encontro lá!'

const is_showing = ref(loggedUser?.value?.pay_configs_pendences)

</script>

<template>
    <div class="alert" v-if="is_showing">
        <div class="alert__container">
            <Close @click="is_showing = !is_showing" />
            <figure class="alert__image">
                <img src="@/assets/images/none.png" />
            </figure>
            <div class="alert__message">
                <span class="alert__message--title">{{validate_doc_title}}</span>
                <span class="alert__message--description">{{validate_doc_description}}</span>
            </div>
        </div>
        <div class="alert__alert--action">
            <Button @click="onToggleAccountType(true)" type="quaternary">Continuar</Button>
        </div>
    </div>

    <Dialog
        :border="true"
        @opened="(opened: boolean) => onToggleAccountType(opened)"
        :open="isAccountTypeOpen"> 

        <div class="dialog-account-type__content--title">
            <label>Selecione o tipo da sua conta</label>
        </div>

        <Row align_items="center" class="dialog-account-type__content--line" justify_content="center">
            <Column gap="12px" align_items="center">
                <RadioButton
                    id="unique"
                    @toggle="pf = true; pj = false"
                    v-model="pf"
                    label="Conta PF (CPF)" />

                <RadioButton
                    id="recurrent"
                    @toggle="pj = true; pf = false"
                    v-model="pj"
                    label="Conta PJ (CNPJ)" />
            </Column>
        </Row>

        <div class="dialog-account-type__footer">
            <span @click="onToggleAccountType(false)">Cancelar</span>

            <div class="dialog-account-type__footer--next">
                <Button @click="onNextAccountType">Continuar</Button>
            </div>
        </div>
    </Dialog>

    <AddNewAccountCNPJView @closed="isConfigCNPJ = false" v-if="isConfigCNPJ" />
    <AddNewAccountCPFView @closed="isConfigCPF = false" v-if="isConfigCPF" />
</template>

<style lang="scss" scoped>
.alert {
    width: 100%; 
    border-radius: 8px;
    background-color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;

    &__container {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    &__image {
        img {
            border-radius: 100%;
            width: 38.919px;
            height: 38.919px;
            flex-shrink: 0;
        }
    }

    &__message {
        display: flex;
        flex-direction: column;
        gap: 0;

        &--title {
            color: #FFFFFF;
            font-weight: 500;
            font-size: 14px;
            font-style: normal;
        }

        &--description {
            color: #C5B0FF;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }

    &__action {
        &--action {
            width: 100px;
        }
    }

}

.dialog-account-type {
  &__content {
      &--delete-icon {
          justify-content: center;
          display: flex;
          &--icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            border-radius: 100%;
            background: var(--linear-gradient-primary);

            svg {
              width: 24px;
            }
          }
      }

      &--line {
          margin-bottom: 58px;
      }

      &--title {
          flex-direction: column;
          align-items: center;
          gap: 24px;
          display: flex;
          justify-content: center;
          margin-top: 10px;
          padding-bottom: 36px;

          span {
              font-size: 14px;
              text-align: center;
          }
          label {
              font-size: 16px;
              font-family: var(--font-family-bold);
              text-align: center;
          }
      }
  }

  &__footer {
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 6px;
      padding-right: 6px;
      padding-top: 20px;
      border-top: 1px solid rgba(var(--color-gray-rgb), .3);
      span {
          cursor: pointer;
      }

      &--next {
          width: 182px;
      }
  }
}

@media only screen 
  and (min-width: 200px)
  and (max-width: 1300px)
  and (min-height: 200px) {

    .alert {
      padding: 10px;

      > span {
        font-size: 12px;
      }
    }
}
</style>