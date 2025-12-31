<script setup lang="ts">
import { useUtils } from '@/composables/useUtils'
import type { Size } from '@/enums/size.enum'
import { ref, type PropType } from 'vue'
import { useToast } from 'vue-toast-notification'

const props = defineProps({
  id: {
    type: String,
    required: true,
    default: ''
  },
  label: {
    type: String,
    required: false,
    default: 'Arraste e solte ou escolha uma imagem para fazer upload'
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: {
    type: File,
    default: ''
  },
  imagePath: {
    type: String,
    default: '',
    required: false
  },
  size: {
    type: String as PropType<Size>,
    default: 'default',
    required: false
  },
  icon: {
    type: Boolean,
    default: true,
    required: false
  },
  maxLength: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: 'image/png, image/jpeg',
    required: false
  },
  minHeight: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'edit'])

const { isFileSize5MB } = useUtils()
const toast = useToast()
const isDragging = ref(false)
  
const fileBlob = ref('')
const updateValue = (event: Event) => {
  if(props.disabled) return

  const { files } = event.target as HTMLInputElement
  const file = files ? files[0] : new File([], '')

  if(isFileSize5MB(file) || !props.maxLength){
    fileBlob.value = URL.createObjectURL(file)
    
    if(files?.length) emit('edit', files[0])
    if(!files?.length) emit('edit')

    emit('update:modelValue', files ? files[0] : '')
    return
  }
  
  toast.error('Arquivo atingiu o limite máximo (5MB)')

}

const onDragOver = (event: { preventDefault: () => void }) => {
  event.preventDefault();
  if (!isDragging.value) {
    isDragging.value = true;
  }
};

const onDragLeave = (event: { currentTarget: { contains: (arg0: any) => any }; relatedTarget: any }) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    isDragging.value = false;
  }
};

const onDrop = (event: { dataTransfer: { files: any } }) => {
  isDragging.value = false;
  updateValue({ target: { files: event.dataTransfer.files } } as any);
};


const gapSizes = {
  small: '4px',
  default: '28px',
  large: '32px'
}

</script>

<template>
    <div class="upload" :style="{ minHeight }" v-class="{ disabled: disabled }">
        <input :disabled :accept @input="updateValue" :id="id" type="file" :hidden="true"/>
        <label :for="id">
          <div v-if="!imagePath" @dragleave.prevent="onDragLeave" @dragover.prevent="onDragOver" @drop.prevent="onDrop" :class="{ 'upload__content--is-dragging': isDragging }" class="upload__content" v-class="{ [props.size]: true }">
            <div class="bg-drag" v-if="isDragging"></div>
              <div 
                class="upload__content--choose-area" 
                v-if="!fileBlob"
                :style="{ 'gap': gapSizes[size] }"
              >
                  <svg style="height: 42px;width:42px;" v-if="icon"  viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21.2019" cy="21.3196" r="20.5251" fill="#6D39FF"/>
                    <path d="M13.7021 23.8196C13.7021 26.1762 13.7021 27.3554 14.4346 28.0871C15.1663 28.8196 16.3455 28.8196 18.7021 28.8196H23.7021C26.0588 28.8196 27.238 28.8196 27.9696 28.0871C28.7021 27.3554 28.7021 26.1762 28.7021 23.8196M21.2021 24.6529V13.8196M21.2021 13.8196L24.5355 17.4654M21.2021 13.8196L17.8688 17.4654" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>                    
                  <label :for="id">{{label}}</label>
                  <span v-if="description">{{ description }}</span>
              </div>
              <figure v-else class="upload__content--file">
                <img :src="fileBlob">
              </figure>
          </div>
          <div class="upload__content" v-else>
              <figure class="upload__content--file">
                <img :src="imagePath">
              </figure>
          </div>
        </label>
    </div>
</template>

<style lang="scss" scoped>
.upload {
    width: 100%;
    height: 100%;

    &--disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    &__content {

      &--is-dragging {
        border: 4px dashed #B59AFF !important;

        > div.bg-drag {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(181, 154, 255, .6);
        }
      }

      border-radius: 8px;
      border: 1px dashed #B59AFF;
      background: #FAF9FF;
      display: flex;
      align-items: center;
      justify-content: center; 
      cursor: pointer;
      position: relative;
      overflow: hidden;
      height: 100%;

      &--choose-area {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          flex-direction: column;
          svg {
              width: 24px;
              color: var(--color-primary);
          }
          
          label {
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
          }
          
          span {
              font-size: 12px;
              font-weight: 400;
              color: var(--color-secondary);
              max-width: 70%;
              text-align: center;
          }
      }

      &--file {
        img {
          position: absolute;
          transform: translate(-50%, -50%);
          height: 290px;
        }
      }
    }

    label {
      display: block;
      height: 100%;
    }
}
</style>