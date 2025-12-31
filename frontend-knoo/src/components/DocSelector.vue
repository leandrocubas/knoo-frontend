<script setup lang="ts">
import { computed, ref } from 'vue'
import Attach from '@/components/icons/Attach.vue'
import { useToast } from 'vue-toast-notification'
import { useUtils } from '@/composables/useUtils'

const emit = defineEmits(['update:modelValue'])
const fileBlob = ref('')
const files = ref()
const file = ref()

const { isFileSize5MB } = useUtils()
const toast = useToast()

const props = defineProps({
    accept: {
        type: Array<String>,
        required: false,
        default: null
    },
    placeholder: {
        type: String,
        required: false,
        default: null
    },
    text: {
        type: String,
        required: false,
        default: 'Selecione o arquivo...'
    },
    id: {
        type: String,
        required: true,
    },
    multiple: {
        type: Boolean,
        required: false,
        default: false
    }
})

const updateValue = (event: Event) => {
    const { files: eventFiles } = event.target as HTMLInputElement

    const eventFile = eventFiles ? eventFiles[0] : new File([], '')

    if(!isFileSize5MB(eventFile)){
        toast.error('Arquivo atingiu o limite máximo (5MB)')
        return
    }

    fileBlob.value = URL.createObjectURL(eventFile)

    if(props.multiple){
        files.value = eventFiles
        emit('update:modelValue', eventFiles)
        return
    }

    file.value = eventFile
    emit('update:modelValue', eventFile)
}

const acceptString = computed(() => props.accept?.toString())
</script>

<template>
    <div class="doc-selector">
        <input :accept="acceptString" :multiple @input="updateValue" :id="id" type="file" :hidden="true"/>
        <label :for="id" class="doc-selector__label" v-if="!fileBlob">
            <Attach color="var(--color-primary)" />
            <span class="doc-selector__label--text">{{text}}</span>
            <span class="doc-selector__label--placeholder" v-if="placeholder">{{placeholder}}</span>
        </label>
        <div v-else class="doc-selector__selected">
            <span v-if="multiple">
                {{ files?.length.toString().padStart(2, '0') }} arquivos selecionados
            </span>
            <span v-else>{{ file.name }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.doc-selector {
    width: 100%;
    height: 100%;
    border: 1px dashed var(--color-primary);
    border-radius: 20px;
    background: #221419;

    &__selected {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        gap: 10px;
    }

    &__label {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        gap: 10px;
        cursor: pointer;

        &--text {
            font-size: 14px;
        }

        &--placeholder {
            font-size: 12px;
            color: rgba(var(--color-white-rgb), .6);
        }
    }
}
</style>